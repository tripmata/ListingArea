
    function populateWalletData()
    {
        $("#wallet-activity-log").html(
            "<div class='pad-2'>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "</div>"
        );

        $(".load-con").html("<div class='ui placeholder'><div class='line'></div></div>");

        postJson(api+"/wallet-balance", function(data, status){
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    if(d.data.length === 0)
                    {
                        $("#wallet-activity-log").html(
                            "<div class='pad-2 align-c'>" +
                            "<div>" +
                            "<h1><img src='"+phpvars.CDN_URL+"images/empty_box2.png' style='width: 60px;'/></h1>" +
                            "<h3 style='color: lightgray; font-family: quicksandregular;'>No activity on your wallet yet</h3>" +
                            "</div>" +
                            "</div>");

                        $("#total-balance").html("<span style='color: dimgray'><span style='font-family: Lato;'> &#8358;</span> "+numFormat(Number(d.balance).toFixed(2))+"</span>");
                        $("#withdrawable-balane").html("<span style='color: dimgray'><span style='font-family: Lato;'> &#8358;</span> "+numFormat(Number(d.withdrawable).toFixed(2))+"</span>");

                        $("#total-revenue").html("&#8358;</span> "+numFormat(Number(d.revenue).toFixed(2))+"</span>");
                        $("#total-withdrawal").html("&#8358;</span> "+numFormat(Number(d.withdrawn).toFixed(2))+"</span>");
                        $("#total-earnings").html("&#8358;</span> "+numFormat(Number(d.earnings).toFixed(2))+"</span>");
                        $("#available-total").html("&#8358;</span> "+numFormat(Number(d.available).toFixed(2))+"</span>");
                    }
                    else
                    {

                    }
                    //$("#").val(0);
                    //$("#").val();
                }
                else
                {
                    $(".load-con").html("<span style='color: lightgray'><span style='font-family: Lato;'> &#8358;</span> 0.00</span>");
                    $("#wallet-activity-log").html(
                        "<div class='pad-2 align-c'>" +
                        "<div>" +
                        "<h1><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                        "<h2 class='sleak'>Error data returned</h2>" +
                        "</div>" +
                        "</div>");
                }
            }
            else
            {
                $(".load-con").html("<span style='color: lightgray'><span style='font-family: Lato;'> &#8358;</span> 0.00</span>");
                $("#wallet-activity-log").html(
                    "<div class='pad-2 align-c'>" +
                    "<div>" +
                    "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                    "<h3 class='sleak' style='color: lightgray;'>Error data returned</h3>" +
                    "</div>" +
                    "</div>");
            }
        },{filter:$("#wallet-filter").val()});
    }

    function populateWithdrawRequest()
    {
        $("#table-body").html(tableLoader(5));
        postJson(api+"/payoutrequestlog", function (data, status) {
            $("#table-body").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    if(d.data.length === 0)
                    {
                        $("#table-body").html(
                            "<tr><td>" +
                            "<div class='pad-2 align-c'>" +
                            "<div>" +
                            "<h1><img src='"+phpvars.CDN_URL+"images/empty_box2.png' style='width: 60px;'/></h1>" +
                            "<h3 style='color: lightgray; font-family: quicksandregular;'>Withdrwal request is empty</h3>" +
                            "</div>" +
                            "</div>" +
                            "</td></tr>");
                    }
                    else
                    {
                        for(let i = 0; i < d.data.length; i++)
                        {
                            let row = document.createElement("tr");
                            row.id = d.data[i].Id + "-row";

                            let td0 = document.createElement("td");
                            td0.innerHTML = "<label>"+(i + 1)+"</label>";

                            let td1 = document.createElement("td");
                            td1.innerHTML = d.data[i].Question;

                            let td2 = document.createElement("td");
                            td2.innerHTML = d.data[i].Category.Name;

                            let td3 = document.createElement("td");
                            td3.innerHTML = d.data[i].Sort;

                            let td4 = document.createElement("td");
                            let ch = d.data[i].Status ? "checked" : "";
                            td4.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetFaq_Status(this, '"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";

                            let td5 = document.createElement("td");
                            td5.innerHTML = "<div class='w3-container'> " +
                                "<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
                                "<i class='blue wrench icon'></i>" +
                                "<div class='menu'>" +
                                "<div class='header'>Action</div>" +
                                "<div class='item' onclick=\"viewFaqAnswer('" + escape(JSON.stringify(d.data[i])) + "')\"><i class='question circle icon'></i>View Answer</div>" +
                                "<a class='item' href='#new-faq/"+ d.data[i].Id + "'><i class='pencil icon'></i>Edit FAQ</a>" +
                                "<div class='ui divider'></div>" +
                                "<div class='item' onclick=\"ConfirmFaqDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
                                "</div>" +
                                "</div></div>";


                            row.appendChild(td0);
                            row.appendChild(td1);
                            row.appendChild(td2);
                            row.appendChild(td3);
                            row.appendChild(td4);

                            document.getElementById("table-body").appendChild(row);
                        }
                    }
                }
                else
                {
                    $("#table-body").html(
                        "<tr>" +
                        "<td>" +
                        "<div class='pad-2 align-c'>" +
                        "<div>" +
                        "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                        "<h3 class='sleak' style='color: lightgray;'>"+d.message+"</h3>" +
                        "<button class='ui sleak small blue button' onclick='populateWithdrawRequest()'>try again</button> " +
                        "</div>" +
                        "</div>" +
                        "</td>" +
                        "</tr>");
                }
            }
            else
            {
                $("#table-body").html(
                    "<tr>" +
                    "<td>" +
                    "<div class='pad-2 align-c'>" +
                    "<div>" +
                    "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                    "<h3 class='sleak' style='color: lightgray;'>Connection error</h3>" +
                    "<button class='ui sleak small blue button' onclick='populateWithdrawRequest()'>try again</button> " +
                    "</div>" +
                    "</div>" +
                    "</td>" +
                    "</tr>");
            }
        },{});
    }

    function loadWithdrawItem()
    {
        $("#withdraw-item-con").html(
            "<div id='fetch-placeholder-1' style='display: none;'>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>"
        );

        let choice = $("#withdraw-source").val();
        let dsource = choice === "property" ? "myproperties" : (choice === "vehicle" ? "myvehicles" : "mylease");

        $("#fetch-placeholder-1").transition('fade up in', function () {
            postJson(api+"/"+dsource, function(data, status){
                $("#withdraw-item-con").html("");
                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {
                        if(choice === "property")
                        {
                            for(let i = 0; i < d.data.length; i++)
                            {
                                let dv = document.createElement("div");
                                dv.className = "w3-row pad-1 withdraw-item-select-list curve hoverable";
                                dv.style.marginTop = "10px";
                                dv.style.cursor = "pointer";
                                dv.style.display = "none";
                                dv.id = d.data[i].id;
                                dv.setAttribute("item-type", "property");
                                dv.setAttribute("name", d.data[i].Name);
                                dv.setAttribute("city", d.data[i].Cityname);
                                dv.innerHTML =
                                    "<div class='w3-col l4 m4 s4'>" +
                                    "<img src='"+phpvars.FILES_CDN+"/"+d.data[i].Banner+"' style='max-width: 100%; border-radius: 5px;'/>" +
                                    "</div>" +
                                    "<div class='w3-col l8 m8 s8 pad-1'>" +
                                    "<h4 style='margin:0; font-family: varela_roundregular; color: dimgray;'>"+d.data[i].Name+"</h4>" +
                                    "<h6 style='color: deepskyblue; margin: 0; font-family: varela_roundregular;'>" +
                                    "<small><i class='map marker icon'></i> "+d.data[i].Cityname+"</small>" +
                                    "</h6>" +
                                    "</div>";

                                dv.onclick = function(){
                                    propertySelected(this.id,
                                        this.getAttribute('item-type'),
                                        this.getAttribute('name'),
                                        this.getAttribute('city'));
                                }
                                getElement("withdraw-item-con").appendChild(dv);
                            }
                        }
                        else if(choice === "vehicle")
                        {
                            for(let i = 0; i < d.data.length; i++)
                            {
                                let dv = document.createElement("div");
                                dv.className = "w3-row pad-1 withdraw-item-select-list curve hoverable";
                                dv.style.marginTop = "10px";
                                dv.style.cursor = "pointer";
                                dv.style.display = "none";
                                dv.id = d.data[i].id;
                                dv.setAttribute("item-type", "vehicle");
                                dv.setAttribute("name", d.data[i].Color+" "+d.data[i].Model+" "+d.data[i].Type);
                                dv.setAttribute("city", d.data[i].Cityname);
                                dv.innerHTML =
                                    "<div class='w3-col l4 m4 s4'>" +
                                    "<img src='"+phpvars.FILES_CDN+"/"+d.data[i].Image1+"' style='max-width: 100%; border-radius: 5px;'/>" +
                                    "</div>" +
                                    "<div class='w3-col l8 m8 s8 pad-1'>" +
                                    "<h4 style='margin:0; font-family: varela_roundregular; color: dimgray;'>"+d.data[i].Color+" "+d.data[i].Model+" "+d.data[i].Type+"</h4>" +
                                    "<h6 style='color: deepskyblue; margin: 0; font-family: varela_roundregular;'>" +
                                    "<small><i class='map marker icon'></i> "+d.data[i].Cityname+"</small>" +
                                    "</h6>" +
                                    "</div>";

                                dv.onclick = function(){
                                    propertySelected(this.id,
                                        this.getAttribute('item-type'),
                                        this.getAttribute('name'),
                                        this.getAttribute('city'));
                                }
                                getElement("withdraw-item-con").appendChild(dv);
                            }
                        }
                        else
                        {
                            for(let i = 0; i < d.data.length; i++)
                            {
                                let dv = document.createElement("div");
                                dv.className = "w3-row pad-1 withdraw-item-select-list curve hoverable";
                                dv.style.marginTop = "10px";
                                dv.style.cursor = "pointer";
                                dv.style.display = "none";
                                dv.id = d.data[i].id;
                                dv.setAttribute("item-type", "lease");
                                dv.setAttribute("name", d.data[i].Name);
                                dv.setAttribute("city", d.data[i].Cityname);
                                dv.innerHTML =
                                    "<div class='w3-col l4 m4 s4'>" +
                                    "<img src='"+phpvars.FILES_CDN+"/"+d.data[i].Banner+"' style='max-width: 100%; border-radius: 5px;'/>" +
                                    "</div>" +
                                    "<div class='w3-col l8 m8 s8 pad-1'>" +
                                    "<h4 style='margin:0; font-family: varela_roundregular;'>"+d.data[i].Name+"</h4>" +
                                    "<h6 style='color: deepskyblue; margin: 0; font-family: varela_roundregular;'>" +
                                    "<small><i class='map marker icon'></i> "+d.data[i].Cityname+"</small>" +
                                    "</h6>" +
                                    "</div>";

                                dv.onclick = function(){
                                    propertySelected(this.id,
                                        this.getAttribute('item-type'),
                                        this.getAttribute('name'),
                                        this.getAttribute('city'));
                                }
                                getElement("withdraw-item-con").appendChild(dv);
                            }
                        }

                        $(".withdraw-item-select-list").transition({
                            animation:'fade up in',
                            duration  : 800,
                            interval  : 200
                        });
                    }
                    else
                    {
                        $("#withdraw-item-con").html(
                            "<div class='pad-2 align-c'>" +
                            "<div>" +
                            "<h1><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                            "<h2 class='sleak'>Error data returned</h2>" +
                            "</div>" +
                            "</div>");
                    }
                }
                else
                {
                    $("#withdraw-item-con").html(
                        "<div class='pad-2 align-c'>" +
                        "<div>" +
                        "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                        "<h3 class='sleak' style='color: lightgray;'>Error data returned</h3>" +
                        "</div>" +
                        "</div>");
                }
            },{filter:choice});
        });
    }

    function propertySelected(type, item, name, city)
    {
        $("#withdraw-item-con").html(
            "<div>" +
            "<input id='withdraw-item' type='hidden' value='"+item+"'/> " +
            "<div class='ui left action fluid input'>" +
            "<button class='ui small blue icon button' onclick='loadWithdrawItem()'>" +
            "<i class='arrow left icon'></i>" +
            "</button> " +
            "<select id='withdraw-month-select' class='ui fluid dropdown' onchange='loadMonthPayout()'>" +
            "<option value='1'>january</option>" +
            "<option value='2'>febuary</option>" +
            "<option value='3'>march</option>" +
            "<option value='4'>april</option>" +
            "<option value='5'>may</option>" +
            "<option value='6'>june</option>" +
            "<option value='7'>july</option>" +
            "<option value='8'>august</option>" +
            "<option value='9'>september</option>" +
            "<option value='10'>october</option>" +
            "<option value='11'>november</option>" +
            "<option value='12'>december</option>" +
            "</select>" +
            "<select id='withdraw-year-select' class='ui fluid dropdown' onchange='loadMonthPayout()'>" + yearRoll()+ "</select> " +
            "</div> " +
            "</div>" +
            "<div style='margin-top: 20px; margin-bottom: 20px;'>" +
            "<h4 style='font-family: varela_roundregular; color: dimgray; margin: 0;'>"+name+"</h4>" +
            "<h6 style='color: deepskyblue; font-family: varela_roundregular;'>" +
            "<small><i class='map marker icon'></i> "+city+"</small></h6>" +
            "</div>" +
            "<hr/>" +
            "<div id='withdraw-data-con'>" +
            "</div>"
        );

        let date = new Date();
        $("#withdraw-month-select").val(date.getMonth());
        $(".ui.dropdown").dropdown();

        loadMonthPayout();
    }

    function loadMonthPayout()
    {
        $("#withdraw-data-con").html(
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>"
        );

        postJson(api+"/payout-data", function(data, status){
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    $("#withdraw-data-con").html(
                        "<div class='pad-t'>" +
                        "<div>" +
                        "<h3 class='ui header'>Total: <span style='font-family: Lato;'>&#8358;</span>"+numFormat(Number(d.data.Total).toFixed(2))+"</h3>" +
                        "<h6 class='sleak' style='color: dimgray;'>Paid: <span style='font-family: Lato;'>&#8358;</span>"+numFormat(Number(d.data.Paid).toFixed(2))+"</h6>" +
                        "<h6 class='sleak' style='color: dimgray;'>Unpaid: <span style='font-family: Lato;'>&#8358;</span>"+numFormat(Number(d.data.Unpaid).toFixed(2))+"</h6>" +
                        "<br/>" +
                        "<button id='main-withdraw-btn' class='ui sleak small blue button' onclick=\"withdrawPageTransaction("+Number(d.data.Unpaid)+")\">" +
                        "withdraw (<span style='font-family: Lato;'>&#8358;</span> "+numFormat(Number(d.data.Unpaid).toFixed(2))+")</button> " +
                        "<br/>" +
                        "<h6><a href=''>see details</a></h6>" +
                        "</div>" +
                        "</div>");
                }
                else
                {
                    $("#withdraw-data-con").html(
                        "<div class='pad-2 align-c'>" +
                        "<div>" +
                        "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                        "<h3 class='sleak' style='color: lightgray;'>"+d.message+"</h3>" +
                        "<button class='ui sleak small blue button' onclick='loadMonthPayout()'>try again</button> " +
                        "</div>" +
                        "</div>");
                }
            }
            else
            {
                $("#withdraw-data-con").html(
                    "<div class='pad-2 align-c'>" +
                    "<div>" +
                    "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                    "<h3 class='sleak' style='color: lightgray;'>Connection error</h3>" +
                    "<button class='ui sleak small blue button' onclick='loadMonthPayout()'>try again</button> " +
                    "</div>" +
                    "</div>");
            }
        },{month:$("#withdraw-month-select").val(), year:$("#withdraw-year-select").val(), item_type: $("#withdraw-source").val(), item:$("#withdraw-item").val()});
    }

    function yearRoll()
    {
        let years = "";
        let date = new Date();

        for(let i = date.getFullYear(); i > 1990; i--)
        {
            years+= "<option>"+i+"</option>";
        }
        return years;
    }

    function withdrawPageTransaction(amt)
    {
        if(!Number(amt))
        {
            errorButton({btn:"main-withdraw-btn", msg:"Non withdrawable amount"});
        }
        else
        {
            loadingButton({btn:"main-withdraw-btn"});
            postJson(api+"/dowithdrawal", function (data, status) {
                loadingButton({btn:"main-withdraw-btn", loading:false});
                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {

                    }
                    else
                    {
                        $("#withdraw-data-con").html(
                            "<div class='pad-2 align-c'>" +
                            "<div>" +
                            "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                            "<h3 class='sleak' style='color: lightgray;'>"+d.message+"</h3>" +
                            "<button class='ui sleak small blue button' onclick='withdrawPageTransaction("+amt+")'>try again</button> " +
                            "</div>" +
                            "</div>");
                    }
                }
                else
                {
                    $("#withdraw-data-con").html(
                        "<div class='pad-2 align-c'>" +
                        "<div>" +
                        "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                        "<h3 class='sleak' style='color: lightgray;'>Connection error</h3>" +
                        "<button class='ui sleak small blue button' onclick='withdrawPageTransaction("+amt+")'>try again</button> " +
                        "</div>" +
                        "</div>");
                }
            },{month:$("#withdraw-month-select").val(), year:$("#withdraw-year-select").val(), item_type: $("#withdraw-source").val(), item:$("#withdraw-item").val()});
        }
    }




    //---------------- fundwallet logic ----------------------------------------------

    function populatePayinRequest()
    {
        $("#table-body").html(tableLoader(5));
        postJson(api+"/payinrequestlog", function (data, status) {
            $("#table-body").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    if(d.data.length === 0)
                    {
                        $("#table-body").html(
                            "<tr><td>" +
                            "<div class='pad-2 align-c'>" +
                            "<div>" +
                            "<h1><img src='"+phpvars.CDN_URL+"images/empty_box2.png' style='width: 60px;'/></h1>" +
                            "<h3 style='color: lightgray; font-family: quicksandregular;'>Wallet funding activity is empty</h3>" +
                            "</div>" +
                            "</div>" +
                            "</td></tr>");
                    }
                    else
                    {
                        for(let i = 0; i < d.data.length; i++)
                        {
                            let row = document.createElement("tr");
                            row.id = d.data[i].Id + "-row";
                            row.className = "row-item";

                            let td0 = document.createElement("td");
                            td0.innerHTML = "<label>"+(i + 1)+"</label>";

                            let td1 = document.createElement("td");
                            td1.innerHTML = "&#8358;"+numFormat(Number(d.data[i].Amount).toFixed(2));

                            let td2 = document.createElement("td");
                            td2.innerHTML = d.data[i].Method;

                            let td3 = document.createElement("td");
                            td3.innerHTML = d.data[i].Created.WeekDay+", "+d.data[i].Created.Day+"/"+d.data[i].Created.MonthName+"/"+d.data[i].Created.Year;

                            let td4 = document.createElement("td");
                            td4.innerHTML = d.data[i].Accountname;

                            let td5 = document.createElement("td");
                            td5.innerHTML = (d.data[i].Confirmed ?
                                "<span class='status green-back'>Confirmed</span>" :
                                (d.data[i].Declined ? "<span class='status red-back'>Declined</span>" :
                                    "<span class='status yellow-back'>Pending</span>"));

                            let td6 = document.createElement("td");
                            td6.innerHTML = "<i  id='funding-"+d.data[i].Id+"-btn' class='trash red icon' style='cursor: pointer;' onclick=\"deleteFundingRequest('"+d.data[i].Id+"')\"></i>";


                            row.appendChild(td0);
                            row.appendChild(td1);
                            row.appendChild(td2);
                            row.appendChild(td3);
                            row.appendChild(td4);
                            row.appendChild(td5);
                            row.appendChild(td6);

                            document.getElementById("table-body").appendChild(row);
                        }
                    }
                }
                else
                {
                    $("#table-body").html(
                        "<tr>" +
                        "<td>" +
                        "<div class='pad-2 align-c'>" +
                        "<div>" +
                        "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                        "<h3 class='sleak' style='color: lightgray;'>"+d.message+"</h3>" +
                        "<button class='ui sleak small blue button' onclick='populatePayinRequest()'>try again</button> " +
                        "</div>" +
                        "</div>" +
                        "</td>" +
                        "</tr>");
                }
            }
            else
            {
                $("#table-body").html(
                    "<tr>" +
                    "<td>" +
                    "<div class='pad-2 align-c'>" +
                    "<div>" +
                    "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                    "<h3 class='sleak' style='color: lightgray;'>Connection error</h3>" +
                    "<button class='ui sleak small blue button' onclick='populatePayinRequest()'>try again</button> " +
                    "</div>" +
                    "</div>" +
                    "</td>" +
                    "</tr>");
            }
        },{});
    }

    function loadFundMethod(e)
    {
        if($(e).val() === "card")
        {
            $("#fund-item-con").html(
                "<h4 style='font-family: quicksandregular;'>Select payment gateway</h4>" +
                "<p style='font-family: Lato, serif; color: dimgray; line-height: 170%;'>" +
                "Enter the amount and select a payment gateway to proceed" +
                "</p>" +
                "<div>" +
                "<div class='ui fluid labeled input'>" +
                "<label class='ui label' style='font-family: Lato, serif;'>&#8358;</label>" +
                "<input id='amount' class='wix-textbox' placeholder='Amount'/> " +
                "</div>" +
                "<div style='margin-top: 10px;'>" +

                "<label><input id='paystack-pay' class='with-gap' name='paymethod' type='radio' checked/>" +
                "<span><img src='"+phpvars.CDN_URL+"images/paystack.png' style='width: 14px;'/> Paystack</span>" +
                "</label>" +
                "<br/>" +
                "<div style='margin-top: 10px;'> " +
                "<label><input class='with-gap' name='paymethod' type='radio'/>" +
                "<span><img src='"+phpvars.CDN_URL+"images/stripe.png' style='width: 15px;'/> Stripe</span>" +
                "</label>" +
                "</div>" +

                "</div><br/>" +
                "<button id='card-btn' class='ui sleak blue button' style='margin-top: 10px;' onclick='cardPay()'>" +
                "Proceed" +
                "</button> " +
                "</div>");
        }
        else
        {
            $("#fund-item-con").html(
                "<div id='fetch-placeholder-1' style='display: none;'>" +
                "<div class='ui placeholder'>" +
                "<div class='line'></div> " +
                "<div class='line'></div> " +
                "<div class='line'></div> " +
                "</div>"
            );

            $("#fetch-placeholder-1").transition('fade up in', function () {
                postJson(api+"/getbankaccount", function(data, status){
                    $("#fund-item-con").html("");
                    if(status === "done")
                    {
                        let d = JSON.parse(data);

                        if(d.status === "success")
                        {
                            let dv = document.createElement("div");
                            dv.className = "fund-item-select-list";
                            dv.style.marginTop = "10px";
                            dv.style.display = "none";
                            dv.innerHTML =
                                "<table class='ui basic table'>" +
                                "<tr>" +
                                "<td>Bank</td>" +
                                "<td>"+d.bank+"</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<td>Account name</td>" +
                                "<td>"+d.accountname+"</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<td>Account number</td>" +
                                "<td>"+d.accountnumber+"</td>" +
                                "</tr>" +
                                "</table>" +
                                (($(e).val() === "transfer") ?
                                "<h4 style='font-family: quicksandregular;'>Transfer details</h4>" +
                                "<p style='font-family: Lato, serif; color: dimgray; line-height: 170%;'>" +
                                "Provide the amount and account name from where the transfer is made" +
                                "</p>" +
                                "<div>" +
                                "<div class='ui fluid labeled input'>" +
                                "<label class='ui label' style='font-family: Lato, serif;'>&#8358;</label>" +
                                "<input id='amount' class='wix-textbox' placeholder='Amount'/> " +
                                "</div>" +
                                "<div class='ui fluid input' style='margin-top: 10px;'>" +
                                "<input id='acc-name' class='wix-textbox' placeholder='Account name'/> " +
                                "</div>" +
                                "<button id='transfer-btn' class='ui sleak blue button' style='margin-top: 10px;' onclick='logTransfer()'>" +
                                "Transfer completed" +
                                "</button> " +
                                "</div>"  :
                                "<h4 style='font-family: quicksandregular;'>Deposit details</h4>" +
                                "<p style='font-family: Lato, serif; color: dimgray; line-height: 170%;'>" +
                                "Provide the amount and account name from where the transfer is made" +
                                "</p>" +
                                "<div>" +
                                "<div class='ui fluid labeled input'>" +
                                "<label class='ui label' style='font-family: Lato, serif;'>&#8358;</label>" +
                                "<input id='amount' class='wix-textbox' placeholder='Amount'/> " +
                                "</div>" +
                                "<div class='ui fluid input' style='margin-top: 10px;'>" +
                                "<input id='acc-name' class='wix-textbox' placeholder='Depositors name'/> " +
                                "</div>" +
                                "<div class='ui fluid input' style='margin-top: 10px;'>" +
                                "<input id='slip-number' class='wix-textbox' placeholder='Teller number'/> " +
                                "</div>" +
                                "<button id='deposit-btn' class='ui sleak blue button' style='margin-top: 10px;' onclick='logDeposit()'>" +
                                "Deposit done" +
                                "</button> " +
                                "</div>");
                            getElement("fund-item-con").appendChild(dv);

                            $(".fund-item-select-list").transition({
                                animation:'fade up in',
                                duration  : 800
                            });
                        }
                        else
                        {
                            $("#fund-item-con").html(
                                "<div class='pad-2 align-c'>" +
                                "<div>" +
                                "<h1><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                                "<h2 class='sleak'>Error data returned</h2>" +
                                "</div>" +
                                "</div>");
                        }
                    }
                    else
                    {
                        $("#fund-item-con").html(
                            "<div class='pad-2 align-c'>" +
                            "<div>" +
                            "<h1 class='ui header'><i class='ban triangle icon' style='color: rgba(255,0,0,0.1);'></i> </h1>" +
                            "<h3 class='sleak' style='color: lightgray;'>Error data returned</h3>" +
                            "</div>" +
                            "</div>");
                    }
                },{});
            });
        }
    }

    function logTransfer()
    {
        let request = {
            name:$("#acc-name").val(),
            amount: Number($("#amount").val()),
            method:"transfer"
        };

        if(request.name === "")
        {
            errorButton({btn:"transfer-btn", msg:"Name is empty"});
        }
        else if(!Number(request.amount))
        {
            errorButton({btn:"transfer-btn", msg:"Invalid amount"});
        }
        else
        {
            loadingButton({btn:"transfer-btn"});
            postJson(api+"/logfunding", function(data, status){
                loadingButton({btn:"transfer-btn", loading:false});
                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {

                        if($("#table-body").find(".row-item").length === 0)
                        {
                            $("#table-body").html("");
                        }

                        let row = document.createElement("tr");
                        row.id = d.data.Id + "-row";
                        row.className = "row-item";

                        let td0 = document.createElement("td");
                        td0.innerHTML = "<label>0</label>";

                        let td1 = document.createElement("td");
                        td1.innerHTML = "&#8358;"+numFormat(Number(d.data.Amount).toFixed(2));

                        let td2 = document.createElement("td");
                        td2.innerHTML = d.data.Method;

                        let td3 = document.createElement("td");
                        td3.innerHTML = d.data.Created.WeekDay+", "+d.data.Created.Day+"/"+d.data.Created.MonthName+"/"+d.data.Created.Year;

                        let td4 = document.createElement("td");
                        td4.innerHTML = d.data.Accountname;

                        let td5 = document.createElement("td");
                        td5.innerHTML = (d.data.Confirmed ?
                            "<span class='status green-back'>Confirmed</span>" :
                            (d.data.Declined ? "<span class='status red-back'>Declined</span>" :
                                "<span class='status yellow-back'>Pending</span>"));

                        let td6 = document.createElement("td");
                        td6.innerHTML = "<i  id='funding-"+d.data.Id+"-btn' class='trash red icon' style='cursor: pointer;' onclick=\"deleteFundingRequest('"+d.data.Id+"')\"></i>";


                        row.appendChild(td0);
                        row.appendChild(td1);
                        row.appendChild(td2);
                        row.appendChild(td3);
                        row.appendChild(td4);
                        row.appendChild(td5);
                        row.appendChild(td6);

                        row.style.display = "none";
                        if(document.getElementById("table-body").firstChild != null)
                        {
                            document.getElementById("table-body").firstChild.before(row);
                        }
                        else
                        {
                            document.getElementById("table-body").appendChild(row);
                        }

                        $(row).transition({animation:'fade up in', duration:800});

                        $("#amount").val("");
                        $("#acc-name").val("");

                        $("#fund-item-con").html(
                            "<div id='success-con' class='pad-2 align-c' style='margin-top: 20px; line-height: 170%; display: none;'>" +
                            "<img src='"+phpvars.CDN_URL+"images/check_office.png' style='width: 90px;'/>" +
                            "<h4 style='font-family: quicksandregular;'>Request have been logged successfully</h4>" +
                            "<p style='font-family: Lato, serif; color: dimgray; line-height: 170%;'>" +
                            "It will take some time to confirm your payment. Once it is confirmed, your wallet will be credeted" +
                            "</p>" +
                            "</div>");

                        $("#success-con").transition({
                            animation:'fade up in',
                            duration:800,
                            onComplete:function(){
                                setTimeout(function () {
                                    $("#success-con").transition({
                                        animation:'fade up out',
                                        duration:800,
                                        onComplete:function () {
                                            $("#fund-item-con").html(
                                                "<p id='default-text' style='margin-top: 20px; color: lightgray; line-height: 180%; font-family: Lato; display: none;'>" +
                                                "    Select a payment method to add money to your wallet.<br/>" +
                                                "</p>");

                                            $("#default-text").transition({
                                                animation:'fade up in',
                                                duration:800
                                            })
                                        }
                                    });
                                }, 5000);
                            }
                        });
                    }
                    else
                    {
                        errorButton({btn:"transfer-btn", msg:d.message});
                    }
                }
                else
                {
                    errorButton({btn:"transfer-btn", msg:"Connection error"});
                }
            },request);
        }
    }

    function logDeposit()
    {
        let request = {
            name:$("#acc-name").val(),
            amount: Number($("#amount").val()),
            slip:$("#slip-number").val(),
            method:"deposit"
        };

        if(request.name == "")
        {
            errorButton({btn:"deposit-btn", msg:"Empty depositors name"});
        }
        else if(!Number(request.amount))
        {
            errorButton({btn:"deposit-btn", msg:"Invalid amount"});
        }
        else if(request.slip == "")
        {
            errorButton({btn:"deposit-btn", msg:"Empty teller number"});
        }
        else
        {
            loadingButton({btn:"deposit-btn"});
            postJson(api+"/logfunding", function(data, status){
                loadingButton({btn:"deposit-btn", loading:false});
                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {

                        if($("#table-body").find(".row-item").length === 0)
                        {
                            $("#table-body").html("");
                        }

                        let row = document.createElement("tr");
                        row.id = d.data.Id + "-row";
                        row.className = "row-item";

                        let td0 = document.createElement("td");
                        td0.innerHTML = "<label>0</label>";

                        let td1 = document.createElement("td");
                        td1.innerHTML = "&#8358;"+numFormat(Number(d.data.Amount).toFixed(2));

                        let td2 = document.createElement("td");
                        td2.innerHTML = d.data.Method;

                        let td3 = document.createElement("td");
                        td3.innerHTML = d.data.Created.WeekDay+", "+d.data.Created.Day+"/"+d.data.Created.MonthName+"/"+d.data.Created.Year;

                        let td4 = document.createElement("td");
                        td4.innerHTML = d.data.Accountname;

                        let td5 = document.createElement("td");
                        td5.innerHTML = (d.data.Confirmed ?
                            "<span class='status green-back'>Confirmed</span>" :
                            (d.data.Declined ? "<span class='status red-back'>Declined</span>" :
                                "<span class='status yellow-back'>Pending</span>"));

                        let td6 = document.createElement("td");
                        td6.innerHTML = "<i id='funding-"+d.data.Id+"-btn' class='trash red icon' style='cursor: pointer;' onclick=\"deleteFundingRequest('"+d.data.Id+"')\"></i>";


                        row.appendChild(td0);
                        row.appendChild(td1);
                        row.appendChild(td2);
                        row.appendChild(td3);
                        row.appendChild(td4);
                        row.appendChild(td5);
                        row.appendChild(td6);

                        row.style.display = "none";
                        if(document.getElementById("table-body").firstChild != null)
                        {
                            document.getElementById("table-body").firstChild.before(row);
                        }
                        else
                        {
                            document.getElementById("table-body").appendChild(row);
                        }

                        $(row).transition({animation:'fade up in', duration:800});

                        $("#amount").val("");
                        $("#acc-name").val("");
                        $("#slip-number").val("");


                        $("#fund-item-con").html(
                            "<div id='success-con' class='pad-2 align-c' style='margin-top: 20px; line-height: 170%; display: none;'>" +
                            "<img src='"+phpvars.CDN_URL+"images/check_office.png' style='width: 90px;'/>" +
                            "<h4 style='font-family: quicksandregular;'>Request have been logged successfully</h4>" +
                            "<p style='font-family: Lato, serif; color: dimgray; line-height: 170%;'>" +
                            "It will take some time to confirm your payment. Once it is confirmed, your wallet will be credeted" +
                            "</p>" +
                            "</div>");

                        $("#success-con").transition({
                            animation:'fade up in',
                            duration:800,
                            onComplete:function(){
                                setTimeout(function () {
                                    $("#success-con").transition({
                                        animation:'fade up out',
                                        duration:800,
                                        onComplete:function () {
                                            $("#fund-item-con").html(
                                                "<p id='default-text' style='margin-top: 20px; color: lightgray; line-height: 180%; font-family: Lato; display: none;'>" +
                                                "    Select a payment method to add money to your wallet.<br/>" +
                                                "</p>");

                                            $("#default-text").transition({
                                                animation:'fade up in',
                                                duration:800
                                            })
                                        }
                                    });
                                }, 5000);
                            }
                        });
                    }
                    else
                    {
                        errorButton({btn:"deposit-btn", msg:d.message});
                    }
                }
                else
                {
                    errorButton({btn:"deposit-btn", msg:"Connection error"});
                }
            },request);
        }
    }

    function cardPay()
    {
        let request = {
            amount: Number($("#amount").val()),
            method:"card",
            gateway: $("#paystack-pay").prop("checked") ? "paystack" : "stripe",
        };

        if(!Number(request.amount))
        {
            errorButton({btn:"card-btn", msg:"Invalid amount"});
        }
        else
        {
            loadingButton({btn:"card-btn"});
            postJson(api+"/logfunding", function(data, status){
                loadingButton({btn:"card-btn", loading:false});
                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {
                        if(d.Method === "PAYSTACK")
                        {
                            payWithPaystack(d.data, function(){

                            });
                        }
                        else
                        {

                        }
                    }
                    else
                    {
                        errorButton({btn:"card-btn", msg:d.message});
                    }
                }
                else
                {
                    errorButton({btn:"card-btn", msg:"Connection error"});
                }
            },request);
        }
    }
    
    
    function deleteFundingRequest(e)
    {
        ConfirmModal("Are you sure you want to cancel funding request?", function(choice, param){
            if(choice === true)
            {
                doFundingDelete(param);
            }
        }, null, null, e);
    }

    function doFundingDelete(e)
    {
        $("#funding-"+e+"-btn").addClass("loading spinner");
        $("#funding-"+e+"-btn").removeClass("trash");

        postJson(api+"/deletefundingrequest", function (data, status) {
            $("#funding-"+e+"-btn").removeClass("loading spinner");
            $("#funding-"+e+"-btn").addClass("trash");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    $("#"+e+"-row").transition('fade up out', function () {
                        document.getElementById("table-body").removeChild(getElement(e+"-row"));
                    });
                }
                else
                {
                    ShowModal(d.message);
                }
            }
            else
            {
                ShowModal("Connection error. Unable to delete funding request");
            }
        },{request:e});
    }