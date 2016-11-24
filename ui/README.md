# TeamsRate

## Introduction

This project is a web application for better organisation of task management in teams, communities or companies. Also this application allows to make an overall rating between team members, which is based on an amount of completed tasks. And for this reason it also helps to motivate your team. Name "TeamsRate" was chosen for this project based on its goals.

This project allows users to do different operations with tasks: adding, editing, removing. The other features of this application are subscription on groups, adding profile and group photo. It will not be able:

- to make a chat between users, or group of users
- to view the page of the specific user

## User Requirements

### _Software Interfaces_

- API for registration in a system - Google+ and GitHub.
- Frameworks:
  - Backend:
    - Play/Scala
  - Frontend:
    - Semantic UI
    - jQuery
- Database:
  - PostgreSQL

### _User Interfaces_

The interface of this web application is displayed in the attached mockups. Mockups have following pages:

- User feed page
- User todo page
- User settings page
- User's groups page
- Group feed page
- Group members page
- Group settings page

### _User Characteristics_

This web application should perfectly approach for not very big groups of people (5-10), who are working on the same project. It helps to create task easily, and then just watch it status until finish. It excludes all comprehensive tools and features, that it counterpart have. So, it means that this project will be very useful for startups, small companies and communities. The user's age is limited only by the ability of a user to use computer and browser. So, nowadays an indicative limits to users age are from 7 to 65 years old.

### _Assumptions and Dependencies_

Because of the big amount of data, this system needs to make database backups periodically. Also if there will be discovered more comfortable ways to manage tasks - it can lead to some changes in design.

## System Requirements

### _Functional Requirements_

- User registration
  - via email and password
  - via Google+
- Entering the system
  - by email and password
  - by Google+ account
- Opportunity to edit user info:
  - Name
  - Surname
  - Age
  - Country
- Working with tasks
  - Adding
  - Editing
    - Name
    - Description
    - Deadline date
    - Points
  - Removing
  - Binding with user
- Working in group
  - Creating a group
  - Adding a user to group
  - Viewing a task list with filter
  - Viewing rating

### _Non-Functional Requirements_

####Software quality attributes

- Security
  - Only administrators can add, edit and remove tasks from a group
  - Only administrators can add and remove members in a group
  - One user should not have a possibility to change another user&#39;s info
- Valid user interface
  - All pages should have a mark of more than 80 at Google Page Speed Service
  - All pages should be viewed equally in 5 last versions of Chrome, Firefox, Safari and Opera
- Working speed
  - When user opens a web-site for the first time - page should be loaded and displayed in less than 4 seconds.
  - Than all pages should display in less than 2 seconds in a stable Internet connection.