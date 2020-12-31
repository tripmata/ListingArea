<?php

use function Lightroom\Functions\GlobalVariables\{var_get};

if ((isset($_SESSION['admin_res'])) || (isset($_SESSION['customer_res'])))
{
    if (isset($_REQUEST['job']))
    {
        process();
    }
}
else
{
    if(isset($_REQUEST['job']))
    {
        switch ($_REQUEST['job'])
        {
            case "list cities":
            case "list states":
                process();
                break;
            default:
                $ret = new stdClass();
                $ret->status = "login";
                $ret->message = "login & try again";
                $ret->data = "";
                echo json_encode($ret);
        }
    }
    else
    {
        $ret = new stdClass();
        $ret->status = "login";
        $ret->message = "login & try again";
        $ret->data = "";
        echo json_encode($ret);
    }
}

function process()
{
    $job = trim(str_replace(" ", "", $_REQUEST['job']));

    $request = new Request( CLIENT_SERVICE_API . $job);

    if (isset($_SESSION['admin_res']))
    {
        $request->AddParameter("token", $_SESSION['admin_res']);
    }
    elseif (isset($_SESSION['customer_res']))
    {
        $request->AddParameter("token", $_SESSION['customer_res']);
    }

    $request->AddRange(Serializer::SerializeRequest());

    try
    {
        $response = $request->Execute();
    }
    catch (Exception $e)
    {
        echo json_encode(["status"=>"failed","message"=>"Internal application error"]);
    }

    if($response->Type == "JSON")
    {
        echo json_encode($response->Content);
    }
    else
    {
        echo  $response->Content;
    }
}
