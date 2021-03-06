<!DOCTYPE html>
<html>
    <head>
        <title>Name Tumbler</title>
        <meta charset="UTF-8">
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/custom.css" rel="stylesheet">
        <link rel="shortcut icon" href="img/icon.png" />
        <script src="js/bootstrap.min.js"></script>
    </head>  
    <body>  
        <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js" type="text/javascript"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js" type="text/javascript"></script>

        <!-- Navigation bar -->
        <div class="navbar">
            <a href='#'><h1 class="dom">Name</h1><h1 class="tumbl">Tumbler</h1></a>
        </div>
        <div id="index">

            <!-- Input and main page -->
            <div class='container' id="main">
                <h2 class="slogan">We Figure out the combination to unlock the perfect domain for you.</h2>
                <h3 class="light">Put in your search terms and we will let you know what's available.</h3><br><br><br>
                <div id='form' class='col-md-offset-2 form'>
                    <p>Enter as many search terms as you would like separated by a comma. <a class='direct' id="help">Click here for help.</a></p>
                    <div class="help well" id="instruction">Each term separated by a comma will be combined with each term of another line separated by a comma. For example the input.
                        <font color="#1db954"><br>computer,parts<br>buy,sale<br></font>Would search the terms<font color="#1db954">
                        <br>computerbuy.com, computersale.com, partsbuy.com, partssale.com</font>
                    </div><br>
                    <textarea id="input" rows="11" placeholder='Enter Search Terms Here...'></textarea><br>
                    <p>Select the TLDs for your domain search:</p>
                    <div style='align-items: baseline;' id='test'>
                        <input type="checkbox" id='com'>
                        <label for='com'></label><label class='tld'>.com</label>
                        <input type="checkbox" id='net'>
                        <label for='net'></label><label class='tld'>.net</label>
                        <input type="checkbox" id='biz'>
                        <label for='biz'></label><label class='tld'>.biz</label>
                        <input type="checkbox" id='info'>
                        <label for='info'></label><label class='tld'>.info</label>
                    </div>
                    <span style="float:right;"><button class="btn get btn-lg" id="search">Get Results</button></span>
                    <div id='warning1' class="alert alert-danger" style='display:none'>Note enough search terms, separate them by a comma and try again.</div>
                </div>
                <br>    
            </div>

            <!-- Results -->
            <div class='container' id='results' style='display:none;'><br><br>    
                <h2 class='found' id="found">We found some domains for you!</h2>
                <h3 class='select' id="select">Just select the domain names you want and add them to your cart.</h3><br><br><br>   
                <div class='col-md-offset-2 form' id='display'>  
                </div>
                <div class='col-md-offset-2 form'>
                    <form id="checkout" method='post' action="https://staging.directnic.com/search/add_group" target="_blank"><span style="float:right;">
                            <input type="hidden" id="checked" name='data'>
                            <input type="submit" class="btn review btn-lg" id="review" value="Review Selections"></span><br><br><br>
                        <span style='float:right'><label class='note'>Note: You will be redirected to Directnic.com to purchase your domains</label></span></form>
                </div>
            </div>

        </div>
        <!-- terms and conditions -->
        <div id="terms" style="display:none;">
            <div class='container' style='height: 90vh;padding-left: 16%;padding-right: 16%'><br><br>

                <h2 class="slogan">Terms and Conditions</h2>
                <h3 class='light'>Last updated: (5/20/2013)</h3><br>
                <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the nametumbler.com website (the "Service") operated by DNC holdings. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. </p>
                <p><b style='color: #1db954'>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</b></p>
                <br><h3 class='light'>Links to other sites</h3><br>
                <p>Our Service may contain links to third­party web sites or services that are not owned or controlled by DNC holdings. DNC holdings has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that DNC holdings shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services. </p>
                <br><h3 class='light'>Changes</h3><br>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. </p>
                <br><h3 class='light'>Contact Us </h3><br>
                <p>If you have any questions about these Terms, please contact us.</p>
            </div>
        </div>
        <!-- privacy -->       
        <div id="privacy" style="display:none">
            <div class='container' style='height: 90vh'><br><br>

                <h2 class="slogan">Privacy Policy</h2>
                <br>

            </div>
        </div>
        <!-- Footer -->
        <div class="footer">
            <p class='footer'>©2016 nametumbler.com - In partnership with&nbsp;<a href="https://directnic.com/" target='new' class='direct'>Directnic.com</a>
                <span style='float:right;'><a href='#terms'>Terms and Conditions</a>&nbsp;|&nbsp;<a href='#privacy'>Privacy Policy</a></span>
            </p>
        </div>

        <!-- Script -->
        <script src="js/createAndSearch.js"></script> 
        <script>$.post("https://staging.directnic.com/search/add_group",JSON.stringify('["riggscaleb.com"]'));</script>
    </body>  
</html>
