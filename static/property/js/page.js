
    function DoSignOut()
    {
        let cover = document.createElement("div");
        cover.style.position = "fixed";
        cover.style.top = "0px";
        cover.style.width = "100%";
        cover.style.height = "100%";
        cover.style.left = "0px";
        cover.className = "ui loading form";
        cover.style.zIndex = "300";
        cover.id = "logout-cover";

        document.body.append(cover);
        cover.style.backgroundColor = "rgba(255,255,255,0.0)";

        postJson("worker/logout", function (data, status) {
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    location.href = d.url;
                }
                else
                {
                    ShowModal(d.message);
                }
            }
            else
            {
                ShowModal("Connection error. Unable to logout");
            }

            document.body.removeChild(document.getElementById("logout-cover"));

        },{});
    }


    /*==================== SHOW NAVBAR ====================*/
    const showMenu = (headerToggle, navbarId) =>{
        const toggleBtn = document.getElementById(headerToggle),
        nav = document.getElementById(navbarId)
        
        // Validate that variables exist
        if(headerToggle && navbarId){
            toggleBtn.addEventListener('click', ()=>{
                // We add the show-menu class to the div tag with the nav__menu class
                nav.classList.toggle('show-menu')
                // change icon
                toggleBtn.classList.toggle('bx-x')
            })
        }
    }
    showMenu('header-toggle','navbar');

    /*==================== LINK ACTIVE ====================*/
    const linkColor = document.querySelectorAll('.partnernav__link')

    function colorLink(){
        linkColor.forEach(l => l.classList.remove('active'))
        this.classList.add('active')
    }

    linkColor.forEach(l => l.addEventListener('click', colorLink))
