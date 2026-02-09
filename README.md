Recipe App – CookSmart
About
    A dynamic recipe application built using React JS that allows users to browse, search, and filter recipes using data from a public meals API. The app provides an intuitive UI for discovering recipes, viewing full details, and saving favorites.

Features
1) Recipe Listings
    -> Fetches recipes from TheMealDB API
    -> Displays recipe image, name, and category
    -> Clickable recipe cards to view detailed information
2) Search
    -> Search recipes by name or keyword
    -> Real-time search as the user types
    -> Works together with filters for refined results
3) Filters
    -> Filter recipes by Category or Ingredient
    -> Filters are shown in a dropdown UI
    -> Filter options are dynamically loaded from the API
    -> Search and filters work together
    -> Clear filter resets filters while keeping search intact

4) Recipe Details
    -> Displays full recipe information: 
        i)  Category
        ii) Ingredients with measurements
        iii)Instructions
        iv) YouTube video link (if available)
    -> Easy navigation back to the main list

5) Favorites (Optional Feature)
        i)  Mark/unmark recipes as favorites
        ii) Favorites are saved in localStorage
        iii)Favorites persist across page reloads

Tech Stack
  i)  React JS
  ii) React Router
  iii)Axios
  iv) Tailwind CSS (for styling)

User Capabilities
  i)  Browse and search recipes
  ii) Filter recipes by category and ingredients
  iii)View detailed recipe information
  iv) Save favorite recipes for later

API Used
https://www.themealdb.com/api.php