# Login Test Cases

| ID | Scenario | Type | Expected Result |
|----|----------|------|-----------------|
| TC01 | Valid username & valid password | Positive | Login successful |
| TC02 | Valid username & invalid password | Negative | Error message |
| TC03 | Invalid username & valid password | Negative | Error message |
| TC04 | Empty username | Negative | Username required |
| TC05 | Empty password | Negative | Password required |
| TC06 | Password length 7 | Boundary | Validation error |
| TC07 | Password length 8 | Boundary | Accepted |
| TC08 | Password length 20 | Boundary | Accepted |
| TC09 | Password length 21 | Boundary | Validation error |
| TC10 | SQL Injection attempt | Edge | Rejected safely |
| TC11 | Special characters | Edge | Proper validation |
| TC12 | Session timeout | Edge | Appropriate handling |
