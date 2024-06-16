import path from "node:path";
import swaggerJSDoc, {
  type OAS3Definition,
  type OAS3Options,
} from "swagger-jsdoc";
import { STATUS_CONTENT } from "../modules/common/domain/status.content";

const swaggerDocumentationSetUp: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: `komunly_ rest api documentation`,
    version: "1.0.0",
    description: ``,
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    parameters: {
      page: {
        in: "query",
        name: "page",
        required: false,
        schema: {
          type: "integer",
          description: " page 1 as default",
        },
      },
      limit: {
        in: "query",
        name: "limit",
        required: false,
        schema: {
          type: "integer",
          description: "Limit of data in each page. 10 as default",
        },
      },
      search: {
        in: "query",
        name: "search",
        required: false,
        schema: {
          type: "string",
          description: "search by username, name or description",
        },
      },
      caption: {
        in: "query",
        name: "caption",
        required: false,
        schema: {
          type: "string",
          description: "search by caption",
        },
      },
      isAvailable: {
        in: "query",
        name: "isAvailable",
        required: false,
        schema: {
          type: "boolean",
          description: "search by isAvailable",
        },
      },
      status: {
        in: "query",
        name: "status",
        required: false,
        schema: {
          type: "string",
          enum: [STATUS_CONTENT.normal, STATUS_CONTENT.sersitive],
          description: "search by status",
        },
      },
      reportCount: {
        in: "query",
        name: "reportCount",
        required: false,
        schema: {
          type: "integer",
          description: "search by reportCount",
        },
      },
      isRead: {
        in: "query",
        name: "isRead",
        required: false,
        schema: {
          type: "boolean",
          description: "search by isRead",
        },
      },
    },
    schemas: {
      paginatedTransactionDto: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/TransactionDetailDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      userPublicDataTransaction: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          username: {
            type: "string",
          },
          profilePicture: {
            type: "string",
          },
          bankNumber: {
            type: "string",
          },
        },
      },
      TransactionDetailDto: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          sender: {
            $ref: "#/components/schemas/userPublicDataTransaction",
          },
          receiver: {
            $ref: "#/components/schemas/userPublicDataTransaction",
          },
          amount: {
            type: "number",
          },
          transactionType: {
            type: "string",
            enum: ["TRANSFERENCE", "DEPOSIT", "CHARGE"],
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
        },
      },
      paginatedStorieDetailDto: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/storieDetailDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      storieDetailDto: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          author: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              username: {
                type: "string",
              },
              profilePicture: {
                type: "string",
              },
            },
          },
          fileName: {
            type: "string",
          },
          caption: {
            type: "string",
          },
          isAvailable: {
            type: "boolean",
          },
          reportCount: {
            type: "number",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
        },
      },
      paginatedPostDetailDto: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/postDetailDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      postDetailDto: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          author: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              username: {
                type: "string",
              },
              profilePicture: {
                type: "string",
              },
            },
          },
          caption: {
            type: "string",
          },
          status: {
            type: "string",
            enum: [STATUS_CONTENT.normal, STATUS_CONTENT.sersitive],
          },
          isAvailable: {
            type: "boolean",
          },
          reportCount: {
            type: "number",
          },
          likes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          bookmarks: {
            type: "array",
            items: {
              type: "string",
            },
          },
          reposts: {
            type: "array",
            items: {
              type: "string",
            },
          },
          repost: {
            type: "string",
          },
          likesCount: {
            type: "number",
          },
          commentsCount: {
            type: "number",
          },
          repostsCount: {
            type: "number",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
        },
      },
      updateNotificationsDto: {
        type: "object",
        properties: {
          notificationsId: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      createRepostDto: {
        type: "object",
        properties: {
          post_reposted: {
            type: "string",
            require: true,
          },
          user_reposted: {
            type: "string",
            require: true,
          },
          caption: {
            type: "string",
            require: false,
          },
        },
      },
      transactiondto: {
        type: "object",
        properties: {
          sender: {
            type: "string",
            require: true,
          },
          receiver: {
            type: "string",
            require: false,
          },
          amount: {
            type: "number",
            require: true,
          },
          concept: {
            type: "string",
            require: false,
          },
          transactionType: {
            type: "string",
            enum: ["TRANSFERENCE", "DEPOSIT", "CHARGE"],
            require: true,
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      createTransactiondto: {
        type: "object",
        properties: {
          sender: {
            type: "string",
            require: true,
          },
          receiver: {
            type: "string",
            require: false,
          },
          amount: {
            type: "number",
            require: true,
          },
          concept: {
            type: "string",
            require: false,
          },
          transactionType: {
            type: "string",
            enum: ["TRANSFERENCE", "DEPOSIT", "CHARGE"],
            require: true,
          },
        },
      },
      updateStorieAdminDto: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["normal", "sensitive"],
          },
          isAvailable: {
            type: "boolean",
          },
        },
      },
      updatePostAdminDto: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["normal", "sensitive"],
          },
          isAvailable: {
            type: "boolean",
          },
        },
      },
      createUserDto: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
          username: {
            type: "string",
          },
          role_id: {
            type: "string",
          },
        },
      },
      reportPaginated: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/reportDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      reportDto: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            enum: [
              "spam",
              "harassment",
              "inappropriate",
              "copyright_infringement",
              "other",
            ],
          },
          post: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              author: {
                type: "string",
              },
              caption: {
                type: "string",
              },
              status: {
                type: "string",
                enum: [STATUS_CONTENT.normal, STATUS_CONTENT.sersitive],
              },
              isAvailable: {
                type: "boolean",
              },
            },
          },
          storie: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              author: {
                type: "string",
              },
              caption: {
                type: "string",
              },
              status: {
                type: "string",
                enum: [STATUS_CONTENT.normal, STATUS_CONTENT.sersitive],
              },
              isAvailable: {
                type: "boolean",
              },
            },
          },
          description: {
            type: "string",
          },
        },
      },
      createReportDto: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            enum: [
              "spam",
              "harassment",
              "inappropriate",
              "copyright_infringement",
              "other",
            ],
          },
          post_id: {
            type: "string",
            require: false,
          },
          storie_id: {
            type: "string",
            require: false,
          },
          description: {
            type: "string",
          },
        },
      },
      paginatedRoles: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/role",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      role: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          value: {
            type: "string",
          },
        },
      },
      updatePostImageDto: {
        type: "object",
        properties: {
          postImage: {
            type: "string",
            format: "binary",
            require: false,
          },
        },
      },
      UpdatePostDto: {
        type: "object",
        properties: {
          caption: {
            type: "string",
            require: false,
          },
          status: {
            type: "string",
            enum: ["normal", "sensitive"],
            require: false,
          },
        },
      },
      createPostDto: {
        type: "object",
        properties: {
          postImage: {
            type: "string",
            format: "binary",
            require: false,
          },
          caption: {
            type: "string",
          },
        },
      },
      postDto: {
        type: "object",
        properties: {
          fileName: { type: "string" },
          author: { type: "string" },
          caption: { type: "string" },
          likes: { type: "array", items: {} },
          bookmarks: { type: "array", items: {} },
          reposted_by: { type: "array", items: {} },
          likesCount: { type: "integer" },
          commentsCount: { type: "integer" },
          repostsCount: { type: "integer" },
          status: { type: "string", enum: ["normal"] },
          _id: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "fileName",
          "author",
          "caption",
          "likes",
          "bookmarks",
          "reposted_by",
          "likesCount",
          "commentsCount",
          "repostsCount",
          "status",
          "_id",
          "createdAt",
          "updatedAt",
        ],
      },
      paginatedviwerDetails: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/viwerDetailsDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      viwerDetailsDto: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          user: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              username: {
                type: "string",
              },
              profilePicture: {
                type: "string",
              },
              isActive: {
                type: "boolean",
              },
              verificado: {
                type: "boolean",
              },
              isPublic: {
                type: "boolean",
              },
            },
          },
          storie: {
            type: "string",
          },
          viewedAt: {
            type: "string",
            format: "date-time",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      viwerDto: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          user: {
            type: "string",
          },
          storie: {
            type: "string",
          },
          viewedAt: {
            type: "string",
            format: "date-time",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      getUserStories: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            fileName: {
              type: "string",
            },
            author: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                },
                username: {
                  type: "string",
                },
                profilePicture: {
                  type: "string",
                },
                isActive: {
                  type: "boolean",
                },
                verificado: {
                  type: "boolean",
                },
                isPublic: {
                  type: "boolean",
                },
              },
              required: [
                "_id",
                "username",
                "profilePicture",
                "isActive",
                "verificado",
                "isPublic",
              ],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            caption: {
              type: "string",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
            status: {
              type: "string",
            },
          },
          required: [
            "_id",
            "fileName",
            "author",
            "createdAt",
            "caption",
            "updatedAt",
          ],
        },
      },
      getAllFollowingStorie: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            author: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                },
                username: {
                  type: "string",
                },
                profilePicture: {
                  type: "string",
                },
                isActive: {
                  type: "boolean",
                },
                isPublic: {
                  type: "boolean",
                },
                verificado: {
                  type: "boolean",
                },
              },
              required: [
                "_id",
                "username",
                "profilePicture",
                "isActive",
                "isPublic",
                "verificado",
              ],
            },
            stories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                  },
                  fileName: {
                    type: "string",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                  },
                  caption: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                },
                required: ["_id", "fileName", "createdAt", "caption"],
              },
            },
          },
          required: ["_id", "author", "stories"],
        },
      },
      AddViwerToriesDto: {
        type: "object",
        properties: {
          userId: {
            type: "string",
          },
        },
      },
      storieDto: {
        type: "object",
        properties: {
          fileName: {
            type: "string",
          },
          author: {
            type: "string",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          caption: {
            type: "string",
          },
          _id: {
            type: "string",
          },
          status: {
            type: "string",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
        required: [
          "fileName",
          "author",
          "createdAt",
          "caption",
          "_id",
          "updatedAt",
        ],
      },
      createStoriesDto: {
        type: "object",
        properties: {
          storieImage: {
            type: "string",
            format: "binary",
            require: false,
          },
          caption: {
            type: "string",
          },
          type: {
            type: "string",
            enum: ["free", "premium"],
          },
        },
      },
      updateUserDto: {
        type: "object",
        properties: {
          username: {
            type: "string",
          },
          description: {
            type: "string",
          },
          isPublic: {
            type: "boolean",
          },
        },
      },
      updataProfilePictureDto: {
        type: "object",
        properties: {
          profilePicture: {
            type: "string",
            format: "binary",
          },
        },
      },
      paginatedpublicUserDto: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/publicUserDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      paginatedpublicAdminUserDto: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/userAdminProfileDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      publicUserDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          profilePicture: { type: "string" },
          premium: { type: "boolean" },
          isActive: { type: "boolean" },
          isPublic: { type: "boolean" },
          verificado: { type: "boolean" },
          description: { type: "string" },
          followersCount: { type: "integer" },
          followingsCount: { type: "integer" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "_id",
          "username",
          "profilePicture",
          "premium",
          "isActive",
          "isPublic",
          "verificado",
          "description",
          "followersCount",
          "followingsCount",
          "createdAt",
          "updatedAt",
        ],
      },
      updateUserPassworDto: {
        type: "object",
        properties: {
          currentPassword: { type: "string" },
          newPassword: { type: "string" },
          confirmPassword: { type: "string" },
        },
        required: ["currentPassword", "newPassword", "confirmPassword"],
      },
      profileRequestDto: {
        type: "object",
        properties: {
          content_blocked: {
            type: "boolean",
          },
          request_status: {
            type: "string",
          },
          isPublic: {
            type: "boolean",
          },
          profile: {
            items: {
              $ref: "#/components/schemas/userProfileDto",
            },
          },
        },
      },
      profileAdminRequestDto: {
        type: "object",
        properties: {
          content_blocked: {
            type: "boolean",
          },
          request_status: {
            type: "string",
          },
          isPublic: {
            type: "boolean",
          },
          profile: {
            items: {
              $ref: "#/components/schemas/userAdminProfileDto",
            },
          },
        },
      },
      userProfileDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          profilePicture: { type: "string" },
          premium: { type: "boolean" },
          isActive: { type: "boolean" },
          verificado: { type: "boolean" },
          description: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          isPublic: { type: "boolean" },
          followersCount: { type: "integer" },
          followingsCount: { type: "integer" },
          isFollowed: { type: "boolean" },
          postCount: { type: "integer" },
        },
        required: [
          "_id",
          "username",
          "profilePicture",
          "premium",
          "isActive",
          "verificado",
          "description",
          "createdAt",
          "updatedAt",
          "isPublic",
          "followersCount",
          "followingsCount",
          "isFollowed",
          "postCount",
        ],
      },
      userAdminProfileDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          profilePicture: { type: "string" },
          balance: { type: "integer" },
          premium: { type: "boolean" },
          isActive: { type: "boolean" },
          verificado: { type: "boolean" },
          description: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          isPublic: { type: "boolean" },
          followersCount: { type: "integer" },
          followingsCount: { type: "integer" },
          isFollowed: { type: "boolean" },
          postCount: { type: "integer" },
          role: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
              },
            },
          },
        },
        required: [
          "_id",
          "username",
          "profilePicture",
          "premium",
          "isActive",
          "verificado",
          "description",
          "createdAt",
          "updatedAt",
          "isPublic",
          "followersCount",
          "followingsCount",
          "isFollowed",
          "postCount",
        ],
      },
      userBalanceDto: {
        type: "object",
        properties: {
          userBalance: { type: "number" },
        },
        required: ["userBalance"],
      },
      emptyResponse: {
        type: "object",
      },
      paginatedUserChats: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/userChatsDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      userChatsDto: {
        type: "object",
        properties: {
          participants: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                username: { type: "string" },
                profilePicture: { type: "string" },
                premium: { type: "boolean" },
              },
              required: ["_id", "username", "profilePicture", "premium"],
            },
          },
          lastMessage: {
            type: "array",
            items: {
              $ref: "#/components/schemas/messageDto",
            },
          },
        },
        required: ["participants", "lastMessage"],
      },
      paginatedMessagesChat: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/messagesChatDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      messagesChatDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          sender: {
            type: "object",
            properties: {
              _id: { type: "string" },
              username: { type: "string" },
              profilePicture: { type: "string" },
              isActive: { type: "boolean" },
              verificado: { type: "boolean" },
              isPublic: { type: "boolean" },
            },
            required: [
              "_id",
              "username",
              "profilePicture",
              "isActive",
              "verificado",
              "isPublic",
            ],
          },
          receiver: {
            type: "object",
            properties: {
              _id: { type: "string" },
              username: { type: "string" },
              profilePicture: { type: "string" },
              isActive: { type: "boolean" },
              verificado: { type: "boolean" },
              isPublic: { type: "boolean" },
            },
            required: [
              "_id",
              "username",
              "profilePicture",
              "isActive",
              "verificado",
              "isPublic",
            ],
          },
          type: { type: "string", enum: ["IMAGE"] },
          body: { type: "string" },
          image: { type: "string" },
          sentAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "_id",
          "sender",
          "receiver",
          "type",
          "body",
          "image",
          "sentAt",
          "createdAt",
          "updatedAt",
        ],
      },
      messageDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          sender: { type: "string" },
          receiver: { type: "string" },
          type: { type: "string", enum: ["IMAGE"] },
          body: { type: "string" },
          image: { type: "string" },
          sentAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "_id",
          "sender",
          "receiver",
          "type",
          "body",
          "sentAt",
          "createdAt",
          "updatedAt",
        ],
      },
      createMessageDto: {
        type: "object",
        properties: {
          image: {
            type: "string",
            format: "binary",
            require: false,
          },
          receiverId: {
            type: "string",
          },
          type: {
            type: "string",
            enum: ["TEXT", "IMAGES", "POST", "STORY"],
          },
          body: {
            type: "string",
          },
        },
      },
      likeDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          like_by: { type: "string" },
          post_liked: { type: "string" },
          likedAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "_id",
          "like_by",
          "post_liked",
          "likedAt",
          "createdAt",
          "updatedAt",
        ],
      },
      createLikeDto: {
        type: "object",
        properties: {
          post_liked: { type: "string" },
          user_liked: { type: "string" },
        },
        required: ["post_liked", "user_liked"],
      },
      paginatedUserFollowings: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/userFollowingsDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      paginatedUserFollowers: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/userFollowersDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      userFollowingsDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          following: {
            type: "object",
            properties: {
              _id: { type: "string" },
              username: { type: "string" },
              profilePicture: { type: "string" },
              isActive: { type: "boolean" },
              verificado: { type: "boolean" },
              isPublic: { type: "boolean" },
            },
            required: [
              "_id",
              "username",
              "profilePicture",
              "isActive",
              "verificado",
              "isPublic",
            ],
          },
          followedAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: ["_id", "following", "followedAt", "createdAt", "updatedAt"],
      },
      userFollowersDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          follower: {
            type: "object",
            properties: {
              _id: { type: "string" },
              username: { type: "string" },
              profilePicture: { type: "string" },
              isActive: { type: "boolean" },
              verificado: { type: "boolean" },
              isPublic: { type: "boolean" },
            },
            required: [
              "_id",
              "username",
              "profilePicture",
              "isActive",
              "verificado",
              "isPublic",
            ],
          },
          followedAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: ["_id", "follower", "followedAt", "createdAt", "updatedAt"],
      },
      followDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          follower: { type: "string" },
          following: { type: "string" },
          followedAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "_id",
          "follower",
          "following",
          "followedAt",
          "createdAt",
          "updatedAt",
        ],
      },
      createFollowDto: {
        type: "object",
        properties: {
          following: { type: "string" },
        },
        required: ["following"],
      },
      paginatedUserEvent: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/eventDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      paginatedAllEvent: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/eventWithUserDataildto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      eventWithUserDataildto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          created_by: {
            type: "object",
            properties: {
              _id: { type: "string" },
              username: { type: "string" },
              profilePicture: { type: "string" },
              isActive: { type: "boolean" },
              verificado: { type: "boolean" },
              isPublic: { type: "boolean" },
              type: {
                type: "string",
                enum: ["free", "premium"],
              },
            },
            required: [
              "_id",
              "username",
              "profilePicture",
              "isActive",
              "verificado",
              "isPublic",
            ],
          },
          setDate: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "_id",
          "title",
          "created_by",
          "setDate",
          "createdAt",
          "updatedAt",
        ],
      },
      createEventDto: {
        type: "object",
        properties: {
          title: { type: "string" },
          setDate: { type: "string", format: "date" },
          type: {
            type: "string",
            enum: ["free", "premium"],
          },
        },
        required: ["title", "setDate"],
      },
      eventDto: {
        type: "object",
        properties: {
          title: { type: "string" },
          created_by: { type: "string" },
          setDate: { type: "string", format: "date-time" },
          _id: { type: "string" },
          type: {
            type: "string",
            enum: ["free", "premium"],
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "title",
          "created_by",
          "setDate",
          "_id",
          "createdAt",
          "updatedAt",
        ],
      },
      paginatedcommnedWithDetail: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/commnedWithDetailDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      commnedWithDetailDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          comment_by: {
            type: "object",
            properties: {
              _id: { type: "string" },
              username: { type: "string" },
              profilePicture: { type: "string" },
              isActive: { type: "boolean" },
              verificado: { type: "boolean" },
              isPublic: { type: "boolean" },
            },
            required: [
              "_id",
              "username",
              "profilePicture",
              "isActive",
              "verificado",
              "isPublic",
            ],
          },
          post_commented: { type: "string" },
          commentText: { type: "string" },
          commentedAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "_id",
          "comment_by",
          "post_commented",
          "commentText",
          "commentedAt",
          "createdAt",
          "updatedAt",
        ],
      },
      commendDto: {
        type: "object",
        properties: {
          comment_by: { type: "string" },
          post_commented: { type: "string" },
          commentText: { type: "string" },
          commentedAt: { type: "string", format: "date-time" },
          _id: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "comment_by",
          "post_commented",
          "commentText",
          "commentedAt",
          "_id",
          "createdAt",
          "updatedAt",
        ],
      },
      createCommentDto: {
        type: "object",
        properties: {
          post_commented: { type: "string" },
          commentText: { type: "string" },
          authorId: { type: "string" },
        },
        required: ["post_commented", "commentText", "authorId"],
      },
      createBookMarkDto: {
        type: "object",
        properties: {
          postBookmarked: { type: "string" },
        },
        required: ["postBookmarked"],
      },
      paginatedBlookMarks: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/bookMarkDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      bookMarkDto: {
        type: "object",
        properties: {
          _id: { type: "string" },
          post_bookmarked: { type: "string" },
          created_by_user: { type: "string" },
          markedAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      blocksOfUserDto: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          block_to: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              username: {
                type: "string",
              },
              profilePicture: {
                type: "string",
              },
              isActive: {
                type: "boolean",
              },
              verificado: {
                type: "boolean",
              },
              isPublic: {
                type: "boolean",
              },
            },
          },
          blockedAt: {
            type: "string",
            format: "date-time",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      paginatedBlocks: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/blocksOfUserDto",
            },
          },
          totalItems: {
            type: "integer",
          },
          totalPages: {
            type: "integer",
          },
          currentPage: {
            type: "integer",
          },
        },
      },
      blockDto: {
        type: "object",
        properties: {
          block_by: {
            type: "string",
          },
          block_to: {
            type: "string",
          },
          blockedAt: {
            type: "string",
            format: "date-time",
          },
          _id: {
            type: "string",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      CreateBlockDto: {
        type: "object",
        properties: {
          block_to: {
            type: "string",
          },
        },
      },
      UserMeDataDto: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          username: {
            type: "string",
          },
          profilePicture: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          balance: {
            type: "integer",
          },
          premium: {
            type: "boolean",
          },
          isActive: {
            type: "boolean",
          },
          verificado: {
            type: "boolean",
          },
          description: {
            type: "string",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
          isPublic: {
            type: "boolean",
          },
          followersCount: {
            type: "integer",
          },
          followingsCount: {
            type: "integer",
          },
          postCount: {
            type: "integer",
          },
          bankNumber: {
            type: "string",
          },
        },
      },
      UserDataDto: {
        type: "object",
        properties: {
          username: {
            type: "string",
          },
          profilePicture: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          balance: {
            type: "number",
          },
          premium: {
            type: "boolean",
          },
          isActive: {
            type: "boolean",
          },
          isPublic: {
            type: "boolean",
          },
          verificado: {
            type: "boolean",
          },
          description: {
            type: "string",
          },
          followersCount: {
            type: "integer",
          },
          followingsCount: {
            type: "integer",
          },
          _id: {
            type: "string",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      RegisterUserDto: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
          username: {
            type: "string",
          },
        },
      },
      Authentication: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
            format: "uuid",
          },
          roles: {
            type: "array",
            items: {
              type: "string",
            },
          },
          access_token: {
            type: "string",
          },
          expireIn: {
            type: "string",
          },
          refresh_token: {
            type: "string",
          },
          refresh_expireIn: {
            type: "string",
          },
        },
      },
      AuthenticationToken: {
        type: "object",
        properties: {
          access_token: {
            type: "string",
          },
          expireIn: {
            type: "string",
          },
        },
      },
      LoginDto: {
        type: "object",
        properties: {
          username: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      RefreshTokenDto: {
        type: "object",
        properties: {
          refreshToken: {
            type: "string",
          },
        },
      },
      Error422: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          error: {
            type: "string",
          },
          statusCode: {
            type: "integer",
            example: 422,
          },
          issues: {
            type: "array",
            items: {
              $ref: "#/components/schemas/issue",
            },
          },
        },
        required: ["message", "error", "statusCode"],
      },
      issue: {
        type: "object",
        properties: {
          field: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
      Error400: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          error: {
            type: "string",
          },
          statusCode: {
            type: "integer",
            example: 400,
          },
        },
        required: ["message", "error", "statusCode"],
      },
      Error403: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          error: {
            type: "string",
            example: "ACCES_DENIED",
          },
          statusCode: {
            type: "integer",
            example: 403,
          },
        },
        required: ["message", "error", "statusCode"],
      },
      Error500: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          error: {
            type: "string",
            example: "INTERNAL_SERVER_ERROR",
          },
          statusCode: {
            type: "integer",
            example: 500,
          },
        },
        required: ["message", "error", "statusCode"],
      },
      Error401: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          error: {
            type: "string",
            example: "UNAUTHORIZED",
          },
          statusCode: {
            type: "integer",
            example: 401,
          },
        },
        required: ["message", "error", "statusCode"],
      },
    },
  },
};

const swaggerSetup: OAS3Options = {
  swaggerDefinition: swaggerDocumentationSetUp,
  apis: [path.join(`${__dirname}`, "../modules/**/*{.router.ts, .router.js}")],
};

export const swaggerConfig = swaggerJSDoc(swaggerSetup);
