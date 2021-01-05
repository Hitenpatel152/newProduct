$(document).ready(() => {
    var $PasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;

    var EmailIdFlag = false, PasswordFlag = false , ConfirmPasswordFlag = false;

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
    $("#Btn").click(() => {
        
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
        

        if( EmailIdFlag == true && PasswordFlag == true)
        {
            console.log("jj");
            loginpage($("#userEmail").val().trim(),$("#userPassword").val().trim());
        }
        else
        {
            alert("Invalid Input...");
        }
    })
})
function loginpage(userEmail,userPassword)
{
    $.ajax({
    type:"POST",
    url:"loginacc",
    data:{"EmailId":userEmail,"Password":userPassword},
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
    $("#userEmail").val("");
    $("#userPassword").val("");
   
}