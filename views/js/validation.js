$(document).ready(() => {
    var $NameRegEx = /^([a-zA-Z]{2,20})$/;
    var $PasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;

    var NameFlag = false,  EmailIdFlag = false, PasswordFlag = false , ConfirmPasswordFlag = false;

    $("#userName").bind("blur",function(){
        
        $("#userNameValidate").empty();
        if($("#userName").val()=="")
        {
            $("#userNameValidate").html("(*)User Name is required....");
        }
        else
        {
            if($("#userName").val().match($NameRegEx))
            {
                NameFlag = true;
            }
            else
            {
                $("#userNameValidate").html("(*)Invalid input....");
            }
        }

    });

    $("#userEmail").bind("blur",function(){

        $("#userEmailValidate").empty();
        if($("#userEmail").val()=="")
        {
            $("#userEmailValidate").html("(*)Email Id is required....");
        }
        else
        {
            if($("#userEmail").val().match($EmailIdRegEx))
            {
                EmailIdFlag = true;
            }
            else
            {
                $("#userEmailValidate").html("(*)Invalid input....");
            }
        }

    });

    $("#userPassword").bind("blur",function(){

        $("#userPasswordValidate").empty();
        if($("#userPassword").val()=="")
        {
            $("#userPasswordValidate").html("(*)Password is required....");
        }
        else
        {
            if($("#userPassword").val().match($PasswordRegEx))
            {
                PasswordFlag = true;
            }
            else
            {
                $("#userPasswordValidate").html("(*)Invalid input....");
            }
        }

    });
    $("#userConfirmPassword").bind("blur",function(){

        $("#userConfirmPasswordValidate").empty();
        if($("#userConfirmPassword").val()=="")
        {
            $("#userConfirmPasswordValidate").html("(*)Confirm Password is required....");
        }
        else
        {
            if($("#userConfirmPassword").val() == $("#userPassword").val())
            {
                ConfirmPasswordFlag = true;
            }
            else
            {
                $("#userConfirmPasswordValidate").html("(*)Invalid input....");
            }
        }

    });
    $("#Btn").click(() => {
        if($("#userName").val()=="")
        {
            $("#userNameValidate").html("(*)User Name is required....");
        }
        else
        {
            if($("#userName").val().match($NameRegEx))
            {
                NameFlag = true;
            }
            else
            {
                $("#userNameValidate").html("(*)Invalid input....");
            }
        }
        if($("#userEmail").val()=="")
        {
            $("#userEmailValidate").html("(*)Email Id is required....");
        }
        else
        {
            if($("#userEmail").val().match($EmailIdRegEx))
            {
                EmailIdFlag = true;
            }
            else
            {
                $("#userEmailValidate").html("(*)Invalid input....");
            }
        }
        if($("#userPassword").val()=="")
        {
            $("#userPasswordValidate").html("(*)Password is required....");
        }
        else
        {
            if($("#userPassword").val().match($PasswordRegEx))
            {
                PasswordFlag = true;
            }
            else
            {
                $("#userPasswordValidate").html("(*)Invalid input....");
            }
        }
        if($("#userConfirmPassword").val()=="")
        {
            $("#userConfirmPasswordValidate").html("(*)Confirm Password is required....");
        }
        else
        {
            if($("#userConfirmPassword").val() == $("#userPassword").val())
            {
                ConfirmPasswordFlag = true;
            }
            else
            {
                $("#userConfirmPasswordValidate").html("(*)Invalid input....");
            }
        }

        if(NameFlag == true &&  EmailIdFlag == true && PasswordFlag == true && ConfirmPasswordFlag == true)
        {
            createnewpage($("#userName").val().trim(),$("#userEmail").val().trim(),$("#userPassword").val().trim());
        }
        else
        {
            alert("Invalid Input...");
        }
    })
})
function createnewpage(Name,EmailId,Password)
{
    $.ajax({
    type:"POST",
    url:"createnewacc",
    data:{"Name":Name,"EmailId":EmailId,"Password":Password},
    datatype:"JSON",
    cached:false,
    success:function(data){

        alert(data);
        cleardata();

    },
    failur:function(){

       alert("Sorry........."); 
    }
    });

}
function cleardata()
{
    $("#userName").val("");
    $("#userEmail").val("");
    $("#userPassword").val("");
    $("#userConfirmPassword").val("");
}