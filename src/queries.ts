import { gql } from "@apollo/client";

export const GET_PICKUP_POINTS = gql`
  query ($sessionId: ID!, $filters: PickupPointFilterInput) {
    session(id: $sessionId) {
      pickupPoint {
        pickupPoints(filters: $filters) {
          map {
            custom {
              pid
              lat
              lng
              icn
            }
            common
            disallowed
          }
          points(first: 500, page: 1) {
            paginatorInfo {
              count
              hasMorePages
              total
            }
            data {
              icon
              type
              id
              pid
              name
              address {
                country
                state
                city
                postalCode
                addressLine1
                addressLine2
                note
              }
              location {
                latitude
                longitude
              }
              phone
              openingHours {
                day
                start {
                  hour
                  minute
                }
                end {
                  hour
                  minute
                }
              }
              isOpen
            }
          }
        }
      }
    }
  }
`;
//PickupPointSortInput
export const I =gql`
query {
  __type(name: "PickupPointFilterInput") {
    name
    kind
    inputFields {
      name
      type {
        kind
        name
        ofType {
          kind
          name
        }
      }
    }
  }
}
`;

/*{
    "data": {
        "__type": {
            "name": "CustomerAddress",
            "kind": "OBJECT",
            "fields": [
                {
                    "name": "id",
                    "type": {
                        "kind": "SCALAR",
                        "name": "ID",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "referenceId",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "label",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "recipient",
                    "type": {
                        "kind": "OBJECT",
                        "name": "CustomerRecipient",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "address",
                    "type": {
                        "kind": "NON_NULL",
                        "name": null,
                        "ofType": {
                            "kind": "OBJECT",
                            "name": "Address",
                            "__typename": "__Type"
                        },
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "location",
                    "type": {
                        "kind": "OBJECT",
                        "name": "Location",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                }
            ],
            "__typename": "__Type"
        }
    }
}
}

{
    "data": {
        "__type": {
            "name": "Address",
            "kind": "OBJECT",
            "fields": [
                {
                    "name": "country",
                    "type": {
                        "kind": "NON_NULL",
                        "name": null,
                        "ofType": {
                            "kind": "ENUM",
                            "name": "CountryEnum",
                            "__typename": "__Type"
                        },
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "state",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "city",
                    "type": {
                        "kind": "NON_NULL",
                        "name": null,
                        "ofType": {
                            "kind": "SCALAR",
                            "name": "String",
                            "__typename": "__Type"
                        },
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "postalCode",
                    "type": {
                        "kind": "NON_NULL",
                        "name": null,
                        "ofType": {
                            "kind": "SCALAR",
                            "name": "String",
                            "__typename": "__Type"
                        },
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "addressLine1",
                    "type": {
                        "kind": "NON_NULL",
                        "name": null,
                        "ofType": {
                            "kind": "SCALAR",
                            "name": "String",
                            "__typename": "__Type"
                        },
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "addressLine2",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "note",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                }
            ],
            "__typename": "__Type"
        }
    }
}
    
{
    "data": {
        "__type": {
            "name": "Location",
            "fields": [
                {
                    "name": "latitude",
                    "type": {
                        "kind": "NON_NULL",
                        "name": null,
                        "ofType": {
                            "kind": "SCALAR",
                            "name": "Float",
                            "__typename": "__Type"
                        },
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "longitude",
                    "type": {
                        "kind": "NON_NULL",
                        "name": null,
                        "ofType": {
                            "kind": "SCALAR",
                            "name": "Float",
                            "__typename": "__Type"
                        },
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                }
            ],
            "__typename": "__Type"
        }
    }
}

{
    "data": {
        "__type": {
            "name": "CustomerRecipient",
            "fields": [
                {
                    "name": "firstName",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "lastName",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "name",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "language",
                    "type": {
                        "kind": "ENUM",
                        "name": "LanguageEnum",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "email",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                },
                {
                    "name": "phone",
                    "type": {
                        "kind": "SCALAR",
                        "name": "String",
                        "ofType": null,
                        "__typename": "__Type"
                    },
                    "__typename": "__Field"
                }
            ],
            "__typename": "__Type"
        }
    }
}*/
