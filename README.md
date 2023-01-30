<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/djangbahevans/traderseco-challenge">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Trader's Eco Case Study</h3>

  <p align="center">
    My solution to Trader's Eco Case Study
    <br />
    <a href="https://github.com/djangbahevans/traderseco-challenge"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/djangbahevans/traderseco-challenge">View Demo</a>
    ·
    <a href="https://github.com/djangbahevans/traderseco-challenge/issues">Report Bug</a>
    ·
    <a href="https://github.com/djangbahevans/traderseco-challenge/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project is a solution to the Trader's Eco Case Study. It is a simple e-commerce application that allows users to create and manage shoes. While not a complete e-commerce app, it allows users to create, read, update and delete items from the app. The application is built with React.js and Node.js. The frontend is built with React.js and the backend is built with Node.js and Express. The application uses MongoDB as the database.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [NodeJS](https://nodejs.org/)
* [React.js](https://reactjs.org/)
* [MongoDB](https://mongodb.org/)
* [Express](https://expressjs.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To avoid having to install multiple dependencies to run the application, it is essential to have docker installed. Install it for your system by following the relevant instructions [here](https://docs.docker.com/get-docker/). All neccesary docker and docker-compose files have been provided.

### Prerequisites

1. [MongoDB](https://mongodb.org/)

2. [NodeJS](https://nodejs.org/)


### Installation

1. Open the frontend and backend folders in separate terminals

2. Add .env files to the frontend and backend folders

3. Frontend .env file

   ```sh
   VITE_API_URL=http://localhost:3000/api/v1/
   ```
4. Backend .env file

   ```sh
    MONGO_URI=mongodb://localhost:27017/traderseco
    JWT_KEY=secret
   ```

5. Run the following commands in the frontend folder

   ```sh
   npm install
   npm run dev
   ```

6. Run the following commands in the backend folder

   ```sh
   npm install
   npm run build
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Visit [http://localhost:5173](http://localhost:5173) on the browser to interact with the application.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

Because this is a test application, no roadmap is available

See the [open issues](https://github.com/djangbahevans/traderseco-challenge/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Evans Djangbah - [@djangbahevans](https://twitter.com/djangbahevans) - djangbahevans@yahoo.com

Project Link: [https://github.com/djangbahevans/traderseco-challenge](https://github.com/djangbahevans/traderseco-challenge)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/djangbahevans/traderseco-challenge.svg?style=for-the-badge
[contributors-url]: https://github.com/djangbahevans/traderseco-challenge/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/djangbahevans/traderseco-challenge.svg?style=for-the-badge
[forks-url]: https://github.com/djangbahevans/traderseco-challenge/network/members
[stars-shield]: https://img.shields.io/github/stars/djangbahevans/traderseco-challenge.svg?style=for-the-badge
[stars-url]: https://github.com/djangbahevans/traderseco-challenge/stargazers
[issues-shield]: https://img.shields.io/github/issues/djangbahevans/traderseco-challenge.svg?style=for-the-badge
[issues-url]: https://github.com/djangbahevans/traderseco-challenge/issues
[license-shield]: https://img.shields.io/github/license/djangbahevans/traderseco-challenge.svg?style=for-the-badge
[license-url]: https://github.com/djangbahevans/traderseco-challenge/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/djangbahevans
[product-screenshot]: images/screenshot.png
