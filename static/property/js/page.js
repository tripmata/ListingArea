
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


