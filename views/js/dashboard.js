
$(document).ready(() => {

    getRecord();

    $(document).on("click",".EditRecordCLS",function(){
        
        alert($(this).attr("data-UserId"))
        findbyid("FINDASPEROBJECTID",$(this).attr("data-UserId"));
        
    });
    $("#BtnUpdateProduct").click(()=>{
         var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("ImgProductDisplayPicUpdate").src = e.target.result;
            };
            reader.readAsDataURL(document.getElementById("FU_ProductImageUpdate").files[0]);
            var filetoupload = document.getElementById("FU_ProductImageUpdate").files;
            var FD = new FormData();
                
            FD.append("filetoupload", filetoupload[0]);
            var contenttype = {
                header: { "content-type": "multipart/form-data" }
            }
            axios.post('/FileUpload', FD, contenttype)
            .then(function (response) {
                IMGDATA = response.data;
                console.log(IMGDATA);
                id= $("#BtnUpdateProduct").attr('data_usereditid');
                console.log(id);
                updateProduct(id,IMGDATA.fileName,$("#ProductNameUpdate").val().trim(), $("#ProductPriceUpdate").val().trim(), $("#ProductQtyUpdate").val().trim(), $("#ProductCategoryUpdate").val());
            });
    })
   
    var FileFlag = false, FileExtFlag = false ,PriceFlag=false,ProductNameFlag=false,ProductQtyFlag=false;
    
    var $NameRegEx = /^([a-zA-Z]{2,20})$/;
    var $NumRegex = /[1-9]{1,5}/g;
    $("#FU_ProductImage").change(function () {
        
        $("#ProductImageValidate").empty();
        if(document.getElementById("FU_ProductImage").files.length == 0)
        {
            $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB!!");
            FileFlag = false;
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
        
        }
        else
        {
            FileFlag = true;
           var extension = document.getElementById("FU_ProductImage").value.split('.').pop().toLowerCase();
            var fileextension = ['jpeg','jpg','png','bmp'];

            if($.inArray(extension,fileextension) == -1)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileExtFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else
            {
                FileExtFlag = true;
            }


        }
        if (FileFlag == true && FileExtFlag == true) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("ImgProductDisplayPic").src = e.target.result;
            };
            reader.readAsDataURL(document.getElementById("FU_ProductImage").files[0]);
        }
        else {
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            $("#FU_ProductImage").replaceWith($("#FU_ProductImage")).val("").clone(true);
        }
    });


    $(document).on('click', '#BtnAddProduct', () => {
        if(document.getElementById("FU_ProductImage").files.length == 0)
        {
            $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB!!");
            FileFlag = false;
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
        
        }
        else
        {
            FileFlag = true;
           var extension = document.getElementById("FU_ProductImage").value.split('.').pop().toLowerCase();
            var fileextension = ['jpeg','jpg','png','bmp'];

            if($.inArray(extension,fileextension) == -1)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileExtFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else
            {
                FileExtFlag = true;
            }


        }
        if($("#ProductName").val()=="")
        {
            $("#ProductNameValidate").html("(*)Product Name is required....");
        }
        else
        {
            if($("#ProductName").val().match($NameRegEx))
            {
                ProductNameFlag = true;
            }
            else
            {
                $("#ProductNameValidate").html("(*)Invalid input....");
            }
        }
        if($("#ProductPrice").val()=="")
        {
            $("#ProductPriceValidate").html("(*)Price is required....");
        }
        else
        {
            if($("#ProductPrice").val().match($NumRegex))
            {
                PriceFlag = true;
            }
            else
            {
                $("#ProductPriceValidate").html("(*)Invalid input....");
            }
        }
        if($("#ProductQty").val()=="")
        {
            $("#ProductQtyValidate").html("(*)Qty is required....");
        }
        else
        {
            if($("#ProductQty").val().match($NumRegex))
            {
                ProductQtyFlag = true;
            }
            else
            {
                $("#ProductQtyValidate").html("(*)Invalid input....");
            }
        }
        
        if (ProductNameFlag == true && PriceFlag == true && ProductQtyFlag == true) {
            var filetoupload = document.getElementById("FU_ProductImage").files;
            var FD = new FormData();
                
            FD.append("filetoupload", filetoupload[0]);
            var contenttype = {
                header: { "content-type": "multipart/form-data" }
            }
                axios.post('/FileUpload', FD, contenttype)
                .then(function (response) {
                    IMGDATA = response.data;
                    console.log(IMGDATA);
                     addProduct(IMGDATA.fileName,$("#ProductName").val().trim(), $("#ProductPrice").val().trim(), $("#ProductQty").val().trim(), $("#ProductCategory").val());
                });
        }
        else
        {
            alert("Invalid Input...");
        }
    })
})

function addProduct(IMGDATA,ProductName,ProductPrice,ProductQty,ProductCategory) {
    $.ajax({
        type:"POST",
        url:"addproduct",
        data:{"FU_ProductImage":IMGDATA,"ProductName":ProductName,"ProductPrice":ProductPrice,"ProductQty":ProductQty,"ProductCategory":ProductCategory},
        datatype:"JSON",
        cached:false,
        success:function(data){
    
            alert(data);
            cleardata();
            $("#myModal .close").click();
            getRecord();
        },
        failur:function(){
    
           alert("Sorry........."); 
    
        }
        });
}
function cleardata()
{
    $("#FProductName").val("");
    $("#ProductPrice").val("");
    $("#ProductQty").val("");
}

function getRecord() {
    console.log("hee");
    $.ajax({
        type:"GET",
        url:"/getproduct",
        data:{},
        datatype:"JSON",
        cached:false,
        success:function(data){
            const records = data.data;
            console.log(data.data);
            
                $("#memberbody").empty();
                let i=0;
                $.each(records,(key , value)=>{
                    $("#memberbody").append(
                        `
                        <tr>
                            <td>${i+1}</td>
                            <td>${value._id}</td>
                            <td>${value.ProductName}</td>
                            <td>${value.ProductPrice}</td>
                            <td>${value.ProductQty}</td>
                            <td>${value.ProductCategory}</td>
                            <td><a data-toggle='modal' data-target='#UpdateRecord' class='EditRecordCLS' data-UserId=${value._id}>Update</a></td>
                        </tr>
                        `
                    );
                    i++;
                })
            
            
        },
        failur:function(){
    
           alert("Sorry........."); 
    
        }
        });
}

function findbyid(FINDASPEROBJECTID,id){
    $.ajax({
        type:"GET",
        url:"/getoneproduct",
        data:{"FINDASPEROBJECTID":FINDASPEROBJECTID ,"id":id},
        datatype:"JSON",
        cached:false,
        success:function(data){
            const records = data.data;
            console.log(data.data);
            document.getElementById("ImgProductDisplayPicUpdate").src = 'controller/productController/images/'+records[0].FU_ProductImage;
                $("#ProductNameUpdate").val(records[0].ProductName);
                $("#ProductPriceUpdate").val(records[0].ProductPrice);
                $("#ProductQtyUpdate").val(records[0].ProductQty);
                $("#BtnUpdateProduct").attr("data_usereditid",records[0]._id);
        },
        failur:function(){
    
           alert("Sorry........."); 
    
        }
    });
}
function updateProduct(id,IMGDATA,ProductName,ProductPrice,ProductQty,ProductCategory){
    $.ajax({
        type:"POST",
        url:"/updateproduct",
        data:{"id":id,"FU_ProductImage":IMGDATA,"ProductName":ProductName,"ProductPrice":ProductPrice,"ProductQty":ProductQty,"ProductCategory":ProductCategory},
        datatype:"JSON",
        cached:false,
        success:function(data){
            console.log(data);
            $("#UpdateRecord .close").click();
            alert(data);
            getRecord();
        },
        failur:function(){
    
           alert("Sorry........."); 
    
        }
    });
}