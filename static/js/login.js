let login = function(){
	
	let request = {
		user:$("#user").val(),
		password:$("#password").val(),
		args:""
	};
	
	let error = false;
	
	if(request.user == "")
	{
		$("#user-con").transition("shake");
		$("#user-con").addClass("error");
		error = true;
	}
	if(request.password == "")
	{
		$("#password-con").transition("shake");
		$("#password-con").addClass("error");
		error = true;
	}
	
	if(error == false)
	{
		$("#lg-btn").addClass("loading disabled");
		
		postJson(api + "/signin",function(data, status){
			$("#lg-btn").removeClass("loading disabled");
			
			if(status == "done")
			{
                let d = JSON.parse(data);
                
				if(d.status == "success")
				{
					$("#lg-btn").addClass("loading disabled");
                    $("#lg-btn").html("<i class='check icon'></i> Authenticating");

                    // store token
                    postJson(url + 'store-token', function(){

						$("#lg-btn").removeClass("loading disabled");
						$("#lg-btn").addClass("disabled positive");
                        $("#lg-btn").html("<i class='check icon'></i> Logging in");

                        // use session storage
                        sessionStorage.setItem('user_token', d.data.token);

                        setTimeout(function(){
                            location.reload();
                        },2000);
                        

                    }, {
                        token : d.data.token
                    });
				}
				else
				{
					$("#lg-btn").html("<i class='times icon'></i>Invalid credentials");
					$("#lg-btn").addClass("disabled negative");
					setTimeout(function(){
						$("#lg-btn").html("Login");
						$("#lg-btn").removeClass("disabled negative");
					},3000);
				}
			}
			else
			{
				$("#lg-btn").html("<i class='times icon'></i>Connection error");
				$("#lg-btn").addClass("disabled negative");
				setTimeout(function(){
					$("#lg-btn").html("Login");
					$("#lg-btn").removeClass("disabled negative");
				},3000);
			}
		}, request);
	}
	
	return false;
}


function unError(e)
{
	$("#"+e.id+"-con").removeClass("error");
}