#Content Management System

CMS (Content Management System) , users can visit the website to gain knowledge about the topic of their interest and other topics .Where the contents are managed by the admin.
Admin add new content , Update the details in the content , and also remove the content. Admin need to login to Admin panel to access the features.

##Technology Used:

###Back-end:
•	Node-Js
•	Express-Js

###Front-end:
•	HTML
•	CSS
•	Js
•	EJS

###Database:
•	MongoDB


##Implementation Steps:


###Step-1:
•	Install required node modules.
•	Node Modules Used:
	Mongoose
	EJS
	Express
	Passport
###Step-2:
•	Setup the required packages.
•	Use get() to show the result for provided URL
•	Use Post() to take the values from post request from the forms

###Step-3:
•	Create Ejs files which contains HTML and Js for rendering and Displaying the results.
•	Style the HTML using CSS files.
•	Connect Ejs files to Node using render().

###Step-4:
•	Connect node to database using mongoose
•	Create mongoose Schema which contain the structure for the table
•	Store the data in database and retrieve data from database as per the requirement.
Step-5:
•	For authentication of Admin use passport.js packages
•	Which check the data entered from login page with database

###Step-6:
•	Create a Admin panel which consists of two text fields one for Title 
And another Content.
•	Which make a post request when submit button is clicked.
And the data will be stored in database and reflected in home page.
 
 1.	At www.website.com/ which will redirect to main page of the website where users
can get/view the contents

 ![image](https://user-images.githubusercontent.com/60570991/181572659-eb2c913d-df02-4b76-923e-e3e0171326f2.png)

 
2.	Main page shows title and content of around 500 words , for more / full detail by clicking Read 
More of the required content ,page will be redirected to the detailed content pages
Examples: url look like www.website.com/post/60ddd8309d2b4934904e70de

![image](https://user-images.githubusercontent.com/60570991/181572848-ea2ad74a-8a90-4706-9f5d-396687bf6797.png)

3.	When  www.website.com/admin is called and if the admin is not logged in ,page will be 
redirected to Login page www.website.com/admin/login , which take username 
and password and crosscheck with the  database admin details

![image](https://user-images.githubusercontent.com/60570991/181572921-e3bc2b21-4b35-446c-b2d9-3708ff96add7.png)

4.	If the Admin is logged in and authenticated www.website.com/admin will be called and 
Admin can use the admin panel, where admin can Publish new post/content and 
delete the existing post/contents.

![image](https://user-images.githubusercontent.com/60570991/181572976-0e528fdd-44b7-4f5b-ac0d-cd1cb5564af9.png)


