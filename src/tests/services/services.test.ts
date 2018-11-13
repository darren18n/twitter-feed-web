import * as nock from "nock"
import { HttpClient } from '../../services/client/http-client';
import { FileImportService } from "../../services/file-import-service";
import { HttpError } from '../../models/errors';

const httpClientInstance = new HttpClient();
const fileImportServiceInstance = new FileImportService(httpClientInstance, undefined);

describe("A successful import using the FileImportService", () => {
  beforeEach(() => {
    const response = {
      users: [
        {
          id: "5be92b6dd6ac2f661c46fd4b",
          screenName: "Alan",
          firstName: "",
          lastName: "",
          bio: "",
          avatar: ""
        },
        {
          id: "5be92b6dd6ac2f661c46fd4c",
          screenName: "Martin",
          firstName: "",
          lastName: "",
          bio: "",
          avatar: ""
        },
        {
          id: "5be92b6dd6ac2f661c46fd4a",
          screenName: "Ward",
          firstName: "",
          lastName: "",
          bio: "",
          avatar: ""
        }
      ],
      followers: [
        {
          user_id: "5be92b6dd6ac2f661c46fd4b",
          follower_id: "5be92b6dd6ac2f661c46fd4a"
        },
        {
          user_id: "5be92b6dd6ac2f661c46fd4b",
          follower_id: "5be92b6dd6ac2f661c46fd4a"
        },
        {
          user_id: "5be92b6dd6ac2f661c46fd4c",
          follower_id: "5be92b6dd6ac2f661c46fd4b"
        },
        {
          user_id: "5be92b6dd6ac2f661c46fd4c",
          follower_id: "5be92b6dd6ac2f661c46fd4a"
        }
      ],
      tweets: [
        {
          id: "5be94f5bd6ac2f661c46fd62",
          user_id: "5be92b6dd6ac2f661c46fd4b",
          message:
            "If you have a procedure with 10 parameters, you probably missed some.",
          create_date: "2018-11-12T10:00:59.320Z",
          update_date: null
        },
        {
          id: "5be94f5bd6ac2f661c46fd63",
          user_id: "5be92b6dd6ac2f661c46fd4a",
          message:
            "There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors.",
          create_date: "2018-11-12T10:00:59.320Z",
          update_date: null
        },
        {
          id: "5be94f5bd6ac2f661c46fd64",
          user_id: "5be92b6dd6ac2f661c46fd4b",
          message:
            "Random numbers should not be generated with a method chosen at random.",
          create_date: "2018-11-12T10:00:59.321Z",
          update_date: null
        }
      ]
    };    

    nock("http://localhost:5000")
      .post("/api/import")
      .reply(200, response);
  });
  
  afterEach(nock.cleanAll);

  it("should return a 200 when importing valid data", () => {
    fileImportServiceInstance.importFiles(new FormData())
    .then(response => {
      // @ts-ignore
      const {users, followers, tweets} = response;

      expect(Array.isArray(users)).toEqual(true);
      expect(Array.isArray(followers)).toEqual(true);
      expect(Array.isArray(tweets)).toEqual(true);

      expect(users).toHaveLength(3);
      expect(followers).toHaveLength(4);
      expect(followers).toHaveLength(3);
    })
  });
});

describe("A failed import using the FileImportService", () => {
  beforeEach(() => {
    const error = new Error("Bad Request");

    nock("http://localhost:5000")
      .post("/api/import")
      .reply(500, error);
  });

  afterEach(nock.cleanAll);

  it("should return a 500 when importing invalid data", () => {
    fileImportServiceInstance.importFiles(new FormData())
    .catch(error => {
      expect(error instanceof HttpError).toEqual(true);
      expect(error).toHaveProperty("message");
      expect(error).toHaveProperty("statusCode");
      expect(error.statusCode).toEqual("500");
    })
  });
});
