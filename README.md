<p align="center">
  <img src="https://crewmeister.com/images/logo_crewmeister_without_text.svg" />
</p>

# 📆 Absence Manager

<p align="center">
<img src="https://i.ibb.co/R0SKWR8/screenshot.png" alt="screenshot" style="width:550px;"/>
</p>

## Context

At Crewmeister we like to work closely with our clients, listening to their demands and developing solutions for their problems. One of the most requested features is a way for company owners to manage sickness and vacations of employees.

We decided to implement this feature for our clients and we are calling it the Absence Manager.

## Product Requirements

- [x] I want to see a list of absences including the names of the employees.
- [x] I want to see the first 10 absences, with the ability to paginate.
- [x] I want to see a total number of absences.
- [x] For each absence I want to see:
  - [x] Member name
  - [x] Type of absence
  - [x] Period
  - [x] Member note (when available)
  - [x] Status (can be 'Requested', 'Confirmed' or 'Rejected')
  - [x] Admitter note (when available)
- [x] I want to filter absences by type.
- [x] I want to filter absences by date.
- [x] I want to see a loading state until the list is available.
- [x] I want to see an error state if the list is unavailable.
- [x] I want to see an empty state if there are no results.
- [x] (Bonus) I can generate an iCal file and import it into outlook.
- [x] (Bonus) Host the website on the service of your choice (Heroku, AWS, GCloud, ...).

## Tech Requirements

- [x] React
- [x] Tests: Jest + react-testing-library / enzyme
- [x] Code Linter
- [x] Redux is a plus.
- [x] Typescript is a plus.
- [x] CSSinJS is a plus: styled-components, styled-system, ... (Personally I perfer CSS Modules)

## 🚀 Give it to me faster!

https://crewmeister-absences.herokuapp.com/

## ⚒️ Help me build the project

1. Install Node 14 or later. npm 6 or later.
2. Clone this repository.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the dev server.
5. Open http://localhost:3000 in any modern browser.
