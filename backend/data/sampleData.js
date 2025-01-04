// backend/data/sampleData.js
const sampleData = [
    {
      "id": 1,
      "role_name": "Super Admin",
      "sub_roles": [
        {
          "id": 2,
          "role_name": "Global Admin",
          "sub_roles": [
            {
              "id": 3,
              "role_name": "Regional Admin",
              "sub_roles": [
                {
                  "id": 4,
                  "role_name": "Country Admin",
                  "sub_roles": [
                    {
                      "id": 5,
                      "role_name": "City Admin",
                      "sub_roles": [
                        {
                          "id": 6,
                          "role_name": "District Admin",
                          "sub_roles": []
                        },
                        {
                          "id": 7,
                          "role_name": "Local Admin",
                          "sub_roles": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": 8,
      "role_name": "Admin",
      "sub_roles": [
        {
          "id": 9,
          "role_name": "Manager",
          "sub_roles": [
            {
              "id": 10,
              "role_name": "Project Lead",
              "sub_roles": []
            }
          ]
        },
        {
          "id": 11,
          "role_name": "Data Engineer",
          "sub_roles": [
            {
              "id": 12,
              "role_name": "ETL Specialist",
              "sub_roles": []
            },
            {
              "id": 13,
              "role_name": "Data Architect",
              "sub_roles": []
            }
          ]
        },
        {
          "id": 14,
          "role_name": "Database Admin",
          "sub_roles": [
            {
              "id": 15,
              "role_name": "Backup Admin",
              "sub_roles": []
            },
            {
              "id": 16,
              "role_name": "Security Admin",
              "sub_roles": []
            }
          ]
        }
      ]
    },
    {
      "id": 17,
      "role_name": "User",
      "sub_roles": [
        {
          "id": 18,
          "role_name": "Power User",
          "sub_roles": []
        },
        {
          "id": 19,
          "role_name": "Analyst",
          "sub_roles": [
            {
              "id": 20,
              "role_name": "Junior Analyst",
              "sub_roles": []
            },
            {
              "id": 21,
              "role_name": "Senior Analyst",
              "sub_roles": []
            }
          ]
        },
        {
          "id": 22,
          "role_name": "Employee",
          "sub_roles": [
            {
              "id": 23,
              "role_name": "Developer",
              "sub_roles": [
                {
                  "id": 24,
                  "role_name": "Frontend Developer",
                  "sub_roles": []
                },
                {
                  "id": 25,
                  "role_name": "Backend Developer",
                  "sub_roles": []
                }
              ]
            },
            {
              "id": 26,
              "role_name": "Tester",
              "sub_roles": []
            }
          ]
        }
      ]
    }
  ];
  
  module.exports = sampleData;
  