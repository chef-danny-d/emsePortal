<nav class="navbar navbar-expand-md navbar-light bg-light">
    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
        <div class="ml-0 mr-auto">
            <span><?php echo $_SESSION['fname']; ?></span>
            <span><?php echo $_SESSION['lname']; ?></span>
            <span><?php echo $_SESSION['username']; ?></span>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="userReg.php">User Registration</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="extract.php">Extraction</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="testReg.php">Assignment Addition</a>
                </li>
            </ul>
        </div>
        <form class="form-inline mr-3 ml-auto search" action="search.php" method="get">
            <input autocomplete="off" required id="search_input" name="term" class="form-control search--input" type="text" placeholder="Search for modules">
            <button class="btn btn-outline-success search--button" type="submit">Search</button>
            <div id="resp"></div>
            <a class="btn btn-danger search--logout" href="components/logout.php">Logout</a>
        </form>
    </div>
</nav>