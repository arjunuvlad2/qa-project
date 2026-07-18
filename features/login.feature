Feature: Login

Scenario: Successful login
  Given the user is on the login page
  When the user enters a valid username and valid password
  And clicks the Login button
  Then the user should be redirected to the dashboard

Scenario: Invalid password
  Given the user is on the login page
  When the user enters a valid username and an invalid password
  Then an error message should be displayed

Scenario: Invalid username
  Given the user is on the login page
  When the user enters an invalid username and a valid password
  Then an error message should be displayed

Scenario: Empty username
  Given the user is on the login page
  When the user leaves the username blank
  Then a username required message should be displayed

Scenario: Empty password
  Given the user is on the login page
  When the user leaves the password blank
  Then a password required message should be displayed
