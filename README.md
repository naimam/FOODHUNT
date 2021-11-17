<div id="top"></div>




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/naimam/4350-Group-11-Project">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">project_title</h3>

  <p align="center">
    Food Hunt aim's to deliver an web application that allows users to find recipes and restaurants for foods they are craving. http://sanst.herokuapp.com/
    <br />
    <a href="https://github.com/naimam/4350-Group-11-Project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://sanst.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/naimam/4350-Group-11-Project/issues">Report Bug</a>
    ·
    <a href="https://github.com/naimam/4350-Group-11-Project/issues">Request Feature</a>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Food Hunt Screen Shot][product-screenshot]](http://sanst.herokuapp.com/)

Food Hunt aim's to deliver an web application that allows users to find recipes and restaurants for foods they are craving. Sometimes users will have ingredients that they do not know what to make with. Other times, the users may not want to cook, but still want to eat with those ingredients. We wanted an app that lets us solve both problems by finding new recipes or restaurants near us based on certain cravings. The app will allow users to login so they can save recipes and store their location to view restaurants in their area. Users will be able to search for recipes based on various ingredients/keywords. If the user cannot find a suitable recipe, they will also be able to search for restaurants to satisfy their cravings.



<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [React.js](https://reactjs.org/)
* [Flask](https://flask.palletsprojects.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Heroku](https://www.heroku.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get started you will need to install some frameworks. The frontend of our website was written in React to display user interfaces in a visually appealing way. The code that powers the backend of our website is in Python, using Flask. Flask Login will be used to manage user sessions. The app is deployed using Heroku. Heroku will also be used to storet he database using Heroku Postgres. Flask SQLAlchemy will be used to create the database models. The Zomato API is used to find restaurants based on a user’s location, and the Edamam Recipe API to find recipes given the user's input of ingredients.


### Prerequisites

You will need to install the following on your host before deployment
* npm
  ```sh
  npm install npm@latest -g
  ```
* python3
  ```sh
  npm install python3@latest -g
  ```
* Flask
  ```sh
  npm install flask@latest -g
  ```

### Installation

1. Get a free Zomato API Key at [https://www.zomato.com/](https://www.zomato.com/)
2. Get a free Edamam API Key at [https://developer.edamam.com/](https://developer.edamam.com/)
3. Setup a Heroku repository [https://www.heroku.com/](https://www.heroku.com/)
4. Clone the repo
   ```sh
   git clone https://github.com/naimam/4350-Group-11-Project.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You can use this webapp to find restraunts and recipies and save them for access later.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [] As a user, I should be able to view my account settings, so I can modify my display name and location.
    - [] ‘Account’ button on the Menu bar at the top of all pages is visible. 
    - [] Clicking on the ‘Account’ button should redirect the user to their account settings page.
    - [] On the account settings page, there are input fields to input the user’s new display name and location.
    - [] Besides the input fields, are ‘Update’ buttons.
    - [] Once the ‘Update’ button is clicked, the user’s account information is updated.

- [] As a user, I should be able to view recipes based on categories (breakfast, lunch, dairy free, gluten free, etc)
    - [] A selection bar that has different categories based on recipes.
    - [] When a user clicks on a category, only items with that tag show up.
    - [] Users could also click on multiple categories to filter further.
    - [] A clear button so the user can clear the filter.
    - [] Check boxes will be visible to let the user know whether or not that filter has been selected.

- [] As a user, I should be able to save my location and use GPS to find my location. 
    - [] There will be a text on the navigation bar that shows the user saved location
    - [] When the user clicks on the text there will be a layover screen with search bar, save button, and a GPS icon with “Use my location” text.
    - [] When the user clicks on the “use my location” button it will automatically fill in the location.
    - [] Show an error message if the location service is blocked.
    - [] The user should be able to click on the save button and save the location they selected through search or through location detection.

- [] As a user, I will be able to click a button to display a search of randomized recipes or restaurants. 
    - [] On the homepage, there will be a button labeled “Random” the user can click on.
    - [] If Recipes are selected, then when pressing the “Random” button, random recipes will be displayed.
    - [] If Restaurants are selected, then random restaurants in the user's area will be displayed.
    - [] Users will still be able to search for recipes or restaurants after clicking the random button.
    - [] After clicking the random button, the user can filter through the results.

- [] As a user, I should be able to save my preferences of food types.
    - [] On the accounts preference I should be able to select any food preferences I may have
    - [] If the user select a food type that they do not wish to eat it should not be displayed 
    - [] This should be saved to the user's profile and can roam with the user
    - [] This should be grouped in types such as halal or vegetarian 
    - [] This should be separate from allergies 

##Known Issues / Errors

- [] Linting:
- [] Python:
- [] yelp.py:
- [] C0301: Line too long, this was disabled because we needed the URL's for the restaurants but it thought it was too long.

- [] app.py:
- [] E0237: Required to make login session limited
- [] W0613: Ignored because React route is being used

- [] "no-undef": "off",
- [] "linebreak-style": "off",
- [] "react/destructuring-assignment": "off",
- [] "react/prop-types": "off",
- [] "func-names": "off",
- [] "no-unused-expressions": "off" 
- 
Eslint:
- [] react/no-array-index-key, react-hooks/exhaustive-deps, react/jsx-filename-extension: given to ignore in milestone 3
- [] index, react/jsx-indent, react/jsx-indent-props: indent conficts with prettier and eslint so decided to ignore
- [] camelcase - risk with renamed variables
- [] react/react-in-jsx-scope - not using react as a global variable


See the [open issues](https://github.com/naimam/4350-Group-11-Project/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Thu Vo ([tvo55@student.gsu.edu](mailto:tvo55@student.gsu.edu))
  
Naima Mohamed ([nmohamed6@student.gsu.edu](mailto:nmohamed6@student.gsu.edu))

Shafaat Huda ([shuda3@student.gsu.edu](mailto:shuda3@student.gsu.edu))
   
Solumtochukwu Orji([sorji1@student.gsu.edu](mailto:sorji1@student.gsu.edu) )
   
Andrew Yen ([ayen4@gsu.edu](mailto:ayen4@gsu.edu))

Project Link: [https://github.com/naimam/4350-Group-11-Project](https://github.com/naimam/4350-Group-11-Project)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>




