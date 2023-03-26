<h1>Maritime Web App Documentation</h1>
<p>This web app is a maritime simulation tool for training and assessing the international collision regulations. The core feature of the app is the scenario simulator which is describe in detail below. 

<h2>Scenario Simulator </h2>
<h3>Intro</h3>
The scenario simulator displays shipping situations that are generated to hightlight specific elements of the international collision regulations. The generated scenarios are show to the user in the form of a radar display and a 3D view.The following paragraphs describe the code and structure for the simualtor. 

<h3>Usage</h3>
<p>To use the web app:</p>
<ol>
  <li>Start the app input <code>npm run devStart</li> to build the js bundle and use nodemon.
  <li>The app is available on port 8080</li>
  <li>Once loaded in browser select ships on the radar to view their properties and information in the accordion info panels.</li>
  <li>Resize the browser window as needed, and the canvas will adjust accordingly to maintain the positions of ships relative to the own ship.</li>
</ol>
<h3>Modules and Dependencies</h3>
<p>The web app uses the following modules and dependencies:</p>
<ul>
  <li><code>paper</code>: A vector graphics library for the browser.</li>
  <li><code>lodash/cloneDeep</code>: A utility function for deep cloning objects.</li>
  <li><code>jquery</code>: For handeling interface and events.</li>
  <li><code>markjs</code>: A JavaScript keyword highlighter.</li>
  <li><code>three</code>:JavaScript library for creating and displaying animated 3D computer graphics in web browsers.<li>
  <li><code>3dmodv2.js</code>: Sets up a Three.js scene with post-processing effects and 3D models, loads audio, and animates the scene based on the movement of ships.</li>
  <li><code>requests.js</code>: Contains the <code>reqData</code> and <code>APIURL</code> functions for making API requests.</li>
  <li><code>report.js</code>: Contains functions for managing the target list, report inputs and report navigation elements.</li>
  <li><code>navigation.js</code>: Handles the navigation menu and related interactions.</li>
</ul>
<h3>Global Variables</h3>
<p>The app uses several global variables to manage its state:</p>
<ul>
  <li><code>resVis</code>: A boolean indicating whether the scenarion is in restricted visibility.</li>
  <li><code>elevation</code>: The elevation of the sun.</li>
  <li><code>play</code>: A boolean indicating whether the animation is playing.</li>
  <li><code>scale</code>: The display scale factor.</li>
  <li><code>centX</code> and <code>centY</code>: The center X and Y coordinates of the canvas.</li>
  <li><code>onemile</code>: A scaling factor for converting canvas units to nautical miles.</li>
</ul>
<h3>Ship Object</h3>
<p>The <code>Ship</code> object is a core element of the code and represents a ship in the simulation and contains the following properties:</p>
<ul>
  <li><code>position</code>: The ship's position ins x y coordinates</li>
  <li><code>vecEnd</code>: The end point of the ship's vector.</li>
  <li><code>vector</code>: The ship's vector, calculated as the difference between its position and vecEnd.</li>
  <li><code>speed</code>: The ship's speed in knots.</li>
  <li><code>course</code>: The ship's course in degrees.</li>
  <li><code>type</code>: The ship's type (e.g., "Own Ship" or "PDV").</li>
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
  <li><code>rules</code>: Navigation rules that apply between own ship and this ship.</li>
  <li><code>bearings</code>: An array of bearings for the ship.</li>
  <li><code>bearingsTaken</code>: An array of bearings that the user has taken to this ship.</li>
  <li><code>selectCount</code>: The number of times the ship has been selected in radar.</li>
  <li><code>toBeReported</code>: A boolean indicating whether the ship should be reported.</li>
</ul>

<h3>Initialization and Event Handlers</h3>
<p>The app initializes a paper canvas and three canvas, sets up event handlers for user interactions, and loads the initial scenario when the page loads. Event handlers are provided for resizing the browser window, dragging ships and vectors, and mouse interactions with ships.</p>
<p>Refer to the source code for detailed implementation of the functions and event handlers.</p>
<h2>Menu and User Interface</h2>
<p>The app provides a user interface with various controls for interacting with the simulation:</p>
<ul>
  <li><strong>Range:</strong> Allows the user to increase or decrease the range scale on the canvas.</li>
  <li><strong>Vector Length:</strong> Allows the user to increase or decrease the vector length for ships on the canvas.</li>
  <li><strong>Accordion Info Panels:</strong> Displays information about ships and their properties when selected.</li>
  <li><strong>Left and Right arrows:</strong> Arrows for scanning the view left and right on the lookout view</li>
  <li><strong>Zoom in:</strong> Allows user to magnify the lookout view</li>
  <li><strong>Compass Bearing:</strong> Allows to measure teh compass bearing of a ship on the lookout page</li>
</ul>
<h3>Conclusion</h3>
<p>This web app provides a visual representation of ships and their relative positions, vectors, and properties. Users can interact with the simulation through a set of controls and submit reports on ships. The app adjusts the canvas and ship positions as needed when resizing the browser window, ensuring a consistent user experience across different screen sizes.</p>

