<h1>Maritime Web App Documentation</h1>
<p>This web app is a maritime simulation tool for training and assessing the international collision regulations. The core feature of the app is the scenario simulator which is describe in detail below. 

<h2>Scenario Simulator </h2>
<h3>Intro</h3>
The scenario simulator displays shipping situations that are generated to hightlight specific elements of the international collision regulations. The generated scenarios are show to the user in the form of a radar display and a 3D view.The following paragraphs describe the code and structure for the simualtor. 

<h3>Usage</h3>
<p>To use the web app:</p>
<ol>
  <li>Load the app in a web browser, and an initial scenario will be displayed on the canvas.</li>
  <li>Use the provided controls to interact with the simulation, such as panning left and right on the 'lookout' view, taking compass bearings, adjusting the radar range scale, or changing radar vector lengths.</li>
  <li>Select ships on the radar to view their properties and information in the accordion info panels.</li>
  <li>Resize the browser window as needed, and the canvas will adjust accordingly to maintain the positions of ships relative to the own ship.</li>
</ol>
<h3>Modules and Dependencies</h3>
<p>The web app imports the following modules and dependencies:</p>
<ul>
  <li><code>requests.js</code>: Contains the <code>reqData</code> and <code>APIURL</code> functions for making API requests.</li>
  <li><code>paper</code>: A vector graphics library for the browser.</li>
  <li><code>lodash/cloneDeep</code>: A utility function for deep cloning objects.</li>
  <li><code>markjs</code>: A JavaScript keyword highlighter.</li>
  <li><code>report.js</code>: Contains functions for managing the target list and report generation.</li>
  <li><code>navigation.js</code>: Handles the navigation menu and related interactions.</li>
</ul>
<h3>Global Variables</h3>
<p>The app uses several global variables to manage its state:</p>
<ul>
  <li><code>resVis</code>: A boolean indicating whether the result visualization is enabled.</li>
  <li><code>elevation</code>: The elevation of the sun.</li>
  <li><code>play</code>: A boolean indicating whether the animation is playing.</li>
  <li><code>scale</code>: The display scale factor.</li>
  <li><code>centX</code> and <code>centY</code>: The center X and Y coordinates of the canvas.</li>
  <li><code>onemile</code>: A scaling factor for converting canvas units to nautical miles.</li>
</ul>
<h3>Functions</h3>
<p>The web app exports several functions for use in other modules:</p>
<ul>
  <li><code>calcvecLength()</code>: Calculates the length of a ship's vector.</li>
  <li><code>calcCPA()</code>: Calculates the closest point of approach (CPA) between two ships.</li>
  <li><code>completeReport()</code>: Generates a report for the selected ship.</li>
  <li><code>urlScen()</code>: Generates a URL for sharing the current scenario.</li>
  <li><code>drawShip()</code>: Draws a ship on the canvas.</li>
  <li><code>updateShips()</code>:
  Updates the positions and vectors of all ships on the canvas.</li>
</ul>
<h3>Ship Object</h3>
<p>The <code>Ship</code> object represents a ship in the simulation and contains the following properties:</p>
<ul>
  <li><code>position</code>: The ship's position on the canvas.</li>
  <li><code>vecEnd</code>: The end point of the ship's vector.</li>
  <li><code>vector</code>: The ship's vector, calculated as the difference between its position and vecEnd.</li>
  <li><code>speed</code>: The ship's speed in knots.</li>
  <li><code>course</code>: The ship's course in degrees.</li>
  <li><code>type</code>: The ship's type (e.g., "Own Ship" or "Target").</li>
  <li><code>typeSound</code>: The ship's sound type.</li>
  <li><code>posSelected</code>: A boolean indicating whether the ship's position is selected.</li>
  <li><code>vecSelected</code>: A boolean indicating whether the ship's vector is selected.</li>
  <li><code>targetSelected</code>: A boolean indicating whether the ship is selected as a target.</li>
  <li><code>editSelected</code>: A boolean indicating whether the ship is selected for editing.</li>
  <li><code>vecOwnShip</code>: The ship's vector relative to the own ship.</li>
  <li><code>OwnShipAngle</code>: The angle between the ship's vector and the own ship's vector.</li>
  <li><code>relposXnm</code> and <code>relposYnm</code>: The ship's relative X and Y positions in nautical miles.</li>
  <li><code>range</code>: The range between the ship and the own ship.</li>
  <li><code>name</code>: The ship's name.</li>
  <li><code>cpa</code>: The closest point of approach (CPA) between the ship and the own ship.</li>
  <li><code>tcpa</code>: The time to the closest point of approach (TCPA) between the ship and the own ship.</li>
  <li><code>rules</code>: The ship's navigation rules.</li>
  <li><code>bearings</code>: An array of bearings for the ship.</li>
  <li><code>bearingsTaken</code>: An array of bearings taken for the ship.</li>
  <li><code>selectCount</code>: The number of times the ship has been selected.</li>
  <li><code>toBeReported</code>: A boolean indicating whether the ship should be reported.</li>
</ul>

<h3>Initialization and Event Handlers</h3>
<p>The app initializes the canvas, sets up event handlers for user interactions, and loads the initial scenario when the page loads. Event handlers are provided for resizing the browser window, dragging ships and vectors, and mouse interactions with ships.</p>
<p>Refer to the source code for detailed implementation of the functions and event handlers.</p>
<h2>Menu and User Interface</h2>
<p>The app provides a user interface with various controls for interacting with the simulation:</p>
<ul>
  <li><strong>New Scenario:</strong> Generates a new scenario with ships and updates the canvas.</li>
  <li><strong>Edit mode:</strong> Allows the user to edit ship positions and vectors on the canvas.</li>
  <li><strong>Range:</strong> Allows the user to increase or decrease the range scale on the canvas.</li>
  <li><strong>Vector Length:</strong> Allows the user to increase or decrease the vector length for ships on the canvas.</li>
  <li><strong>Accordion Info Panels:</strong> Displays information about ships and their properties when selected.</li>
</ul>
<h3>Conclusion</h3>
<p>This web app provides a visual representation of ships and their relative positions, vectors, and properties. Users can interact with the simulation through a set of controls, modify ship positions and vectors, and view detailed information about each ship. The app adjusts the canvas and ship positions as needed when resizing the browser window, ensuring a consistent user experience across different screen sizes.</p>
<p>To get started with the web app, simply load it in your preferred web browser and begin interacting with the controls and ships on the canvas. Happy navigating!</p>
