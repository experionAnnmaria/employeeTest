var eid = [];//Array to store employee ID

function checkId(){
    var lengthId=$("#empId").val().length;

    if(lengthId>4)
    {
        $("#idError").html("Should be less than 4 characters");
        $("#idError").show();
        errorId=true;
    }
    else{
        $("#idError").hide();
    }
}


function checkNameDesignation(){
    var lengthName=$("#name").val().length;
    var lengthDesignation=$("#designation").val().length;
    

    if(lengthName>50)
    {
        $("#nameError").html("Should be less than 50 characters");
        $("#nameError").show();
        errorName=true;
    }
    else{
        $("#nameError").hide();
    }

    if(lengthDesignation>50)
    {
        $("#designationError").html("Should be less than 50 characters");
        $("#designationError").show();
        errorName=true;
    }
    else{
        $("#designationError").hide();
    }
}

function checkSalaries(){
    var lengthBP=$("#basicPay").val().length;
    var lengthDA=$("#dailyAllowance").val().length;
    var lengthHRA=$("#hrAllowance").val().length;
    var lengthMA=$("#medAllowance").val().length;

    if(lengthBP>10)
    {
        $("#basicPayError").html("Should be less than 10 characters");
        $("#basicPayError").show();
        errorBasicPay=true;
    }
    else{
        $("#basicPayError").hide();
    }
    if(lengthDA>10)
    {
        $("#dailyAllowanceError").html("Should be less than 10 characters");
        $("#dailyAllowanceError").show();
        errorDailyAllowance=true;
    }
    else{
        $("#dailyAllowanceError").hide();
    }
    if(lengthHRA>10)
    {
        $("#houseRentAllowanceError").html("Should be less than 10 characters");
        $("#houseRentAllowanceError").show();
        errorHouseRentAllowance=true;
    }
    else{
        $("#houseRentAllowanceError").hide();
    }
    if(lengthMA>10)
    {
        $("#medicalAllowanceError").html("Should be less than 10 characters");
        $("#medicalAllowanceError").show();
        errorMedicalAllowance=true;
    }
    else{
        $("#medicalAllowanceError").hide();
    }
}


$(document).ready(function () {
    $("#dialog-1").dialog({ autoOpen: false });

    //validaion
    $("idError").hide();
    $("nameError").hide();
    $("designationError").hide();
    $("basicPayError").hide();
    $("dailyAllowanceError").hide();
    $("houseRentAllowanceError").hide();
    $("medicalAllowanceError").hide();

    var errorId=false;
    var errorName=false;
    var errorDesignation=false;
    var errorBasicPay=false;
    var errorDailyAllowance=false;
    var errorHouseRentAllowance=false;
    var errorMedicalAllowance=false;

    $("#empId").focusout(function(){
        checkId();
    });
    $("#name ,#designation").focusout(function(){
        checkNameDesignation();
    });
    $("#basicPay, #dailyAllowance, #hrAllowance, #medAllowance").focusout(function(){
        //checkId();
        checkSalaries();
    });        




    //disabling
    $("#form1").prop("disabled", true);

    $('#new').click(function () {
        $("#form1 input").prop("disabled", false);
    });

    $('#cancel').click(function () {
        $('#form1').each(function () {
            this.reset();//reseting form after each save
        });
        $("#form1 input").prop("disabled", true);
    });

    
   //sum();

   $('.pay').keyup(function () {
       var BP = document.getElementById('basicPay').value;
       var HRA = document.getElementById('hrAllowance').value;
       var DA = document.getElementById('dailyAllowance').value;
       var MA = document.getElementById('medAllowance').value;
/*
        if ($(this).attr('name').match(/^input_\d+_\d+_\d+_\d+/)
                        && ($(this).val() == '' || $(this).val() <= 0))
                    {
                        displayDialog("<?=_('error')?>")
                        flag_error = 1;
                        return false;
   }*/
       
       if (DA == "")  //||DA<=0 || !(DA.match(/^input_\d+_\d+_\d+_\d+/))
           DA = 0;
       if (HRA == "")
           HRA = 0;
       if (BP == "")
           BP = 0;
       if (MA == "")
           MA = 0;
           
       var result = parseFloat(DA) + parseFloat(HRA)+parseFloat(BP) + parseFloat(MA);
       if (!isNaN(result)) {
           document.getElementById('salary').value = result;
       }      
   });
//edit
        $('#tab').on('click', '#edit', function () {
        $(this).closest('tr').remove();
        $('#empId').val($(this).parent().siblings().filter(".tableId").text());
        $('#name').val($(this).parent().siblings().filter('.tableName').text());
        $('#designation').val($(this).parent().parent().find('.tableDesignation').text());
        $('#salary').val($(this).parent().parent().find('.tableSalary ').text());
        $("#form1 input").prop("disabled", false);
    });


    $("#save").click(function () {
        var valid = true,
            message = ''; //To store the validation alert message
        $('form input').each(function () //Validating text fields
        {
            var $this = $(this);
            if (!$this.val()) {
                valid = false;
                message += 'Please enter your ' + $this.attr('name') + '\n';
            }
        });
        if (!valid) {
            alert(message);
        }
        else {
            $('#empId').each(function () //Employee id validation
            {
                if ($.inArray(this.value, eid) >= 0) {
                    alert("Existing Employee ID. Please enter a unique one.");
                    return false;
                }
                else {
                    eid.push(this.value); //push empID into eid[]
                    $("#dialog-1").dialog("open");
                    var id = $("#empId").val();
                    var name = $("#name").val();
                    var designat = $("#designation").val();
                    var totSal = $("#salary").val();
                    var display = "<tr> <td class='tableId'>" + id + "</td> <td class='tableName'>" + name + "</td> <td class='tableDesignation'>" 
                    + designat + "</td> <td class='tableSalary'>"+ totSal + "</td> <td> <button id='edit'> Edit </button></td> <td> <button id='delete'> Delete </button> </td> </tr>";
                    $("table").append(display);
                    $("#form1").trigger('reset');
                }
            });
        }

    });

//Deleting row
    $(document).on('click','#delete', function(){
        alert("sure");
     $(this).parents('tr').remove();
    });

});
/*
  $('#tab').on('click', '.edit', function () {
        $(this).closest('tr').remove();
        $('#empId').val($(this).parent().siblings().filter(".tableId").text());
        $('#name').val($(this).parent().siblings().filter('.tableName').text());
        $('#designation').val($(this).parent().parent().find('.tableDesignation').text());
        $('#salary').val($(this).parent().parent().find('.tableSalary ').text());
        $("#form1 input").prop("disabled", false);
    });
    */