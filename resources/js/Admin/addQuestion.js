let childQuestionIdElement = 'childQuestion_';
let addChildQuestionElement = 'add_';
let LIMIT_CHILD_QUESTION = 10;

$('#singleQuestion #randomCode').click(function (e) {
    e.preventDefault();
    $('#singleQuestion input[name=code]').val(randomString());
});

$('#list-childQuestion').on('click', '.randomCode', function (e) {
    e.preventDefault();
    let childQuestionId = $(this).attr('data-childQuestionId');
    $('#' + childQuestionId + ' .childQuestion_code').val(randomString());
});

$('#question_check_kind').change(function () {
    let kind = $(this).is(":checked")

    if (kind) {
        $('#answerParentQuestion').addClass('hidden');
        $('#list-childQuestion').removeClass('hidden');
        $('#addChildQuestionBtnDiv').removeClass('hidden');
        $('#childQuestionNumberLabel').removeClass('hidden');
    } else {
        $('#answerParentQuestion').removeClass('hidden');
        $('#list-childQuestion').addClass('hidden');
        $('#addChildQuestionBtnDiv').addClass('hidden');
        $('#childQuestionNumberLabel').addClass('hidden');
    }
});

$('#singleQuestion select[name=type]').change(function () {
    let type = $(this).val();
    switch (parseInt(type)) {
        case 1:
            $('#singleQuestion .imageDiv').addClass('hidden');
            $('#singleQuestion .audioDiv').addClass('hidden');
            break;
        case 2:
            $('#singleQuestion .imageDiv').removeClass('hidden');
            $('#singleQuestion .audioDiv').addClass('hidden');
            break;
        case 3:
        case 4:
            $('#singleQuestion .imageDiv').addClass('hidden');
            $('#singleQuestion .audioDiv').removeClass('hidden');
            break;
    }
});

$('#list-childQuestion').on('change', 'select', function () {
    let childQuestionId = $(this).attr('data-childQuestionId');
    let questionDiv = '#' + childQuestionId;
    let type = $(this).val();
    switch (parseInt(type)) {
        case 1:
            $(questionDiv + ' .div_image').addClass('hidden');
            $(questionDiv + ' .div_audio').addClass('hidden');
            break;
        case 2:
            $(questionDiv + ' .div_image').removeClass('hidden');
            $(questionDiv + ' .div_audio').addClass('hidden');
            break;
        case 3:
        case 4:
            $(questionDiv + ' .div_image').addClass('hidden');
            $(questionDiv + ' .div_audio').removeClass('hidden');
            break;
    }
});

let childQuestionAddNumber = 1;
let addChildQuestionName = 'childQuestionAdd';
$('#add_childQuestion').on('click', function (e) {
    e.preventDefault();
    let currentChildQuestion = $('#childQuestionsNumber').val();
    if (currentChildQuestion < LIMIT_CHILD_QUESTION) {
        currentChildQuestion++;
        childQuestionAddNumber++;
        let childQuestionAdd = $('#list-childQuestion').children(":first").clone();

        //rename
        childQuestionAdd.attr('id', childQuestionIdElement + addChildQuestionElement + childQuestionAddNumber);
        childQuestionAdd.find('.childQuestion_delete').attr('data-childQuestionId', childQuestionIdElement + addChildQuestionElement + childQuestionAddNumber);
        childQuestionAdd.find('.randomCode').attr('data-childQuestionId', childQuestionIdElement + addChildQuestionElement + childQuestionAddNumber);
        childQuestionAdd.find('.childQuestion_code').attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][code]');
        childQuestionAdd.find('.childQuestion_suggest').attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][suggest]');
        childQuestionAdd.find('.childQuestion_content').attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][content]');
        childQuestionAdd.find('.childQuestion_type').attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][type]');
        childQuestionAdd.find('.childQuestion_type').attr('data-childQuestionId', childQuestionIdElement + addChildQuestionElement + childQuestionAddNumber);
        childQuestionAdd.find('.childQuestion_audio').attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][audio]');
        childQuestionAdd.find('.div_image').addClass('hidden');
        childQuestionAdd.find('.div_audio').addClass('hidden');

        //clear old data
        childQuestionAdd.find('input').val('');
        childQuestionAdd.find('input[type=radio]').attr('checked', false);
        childQuestionAdd.find('option').attr('selected', false);

        //remove image select
        let childQuestion_image_input = childQuestionAdd.find('.childQuestion_image');
        childQuestionAdd.find('.div_image').find('.col-lg-4').children().remove();
        childQuestion_image_input.attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][image]');
        childQuestionAdd.find('.div_image').find('.col-lg-4').append(childQuestion_image_input);
        renderInputFile(childQuestionAdd.find('.div_image').find('input'));

        //answers
        for (let i = 1; i <= 4; i++) {
            childQuestionAdd.find('.answer_' + i).attr('id', addChildQuestionName + childQuestionAddNumber + '_answer_' + i);
            childQuestionAdd.find('.answer_' + i).attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][correct_answer]');
            childQuestionAdd.find('.label_' + i).attr('for', addChildQuestionName + childQuestionAddNumber + '_answer_' + i);

            childQuestionAdd.find('.answer_content_' + i).attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][answers][' + i + '][content]');
            childQuestionAdd.find('.answer_file_' + i).attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][answers][' + i + '][file]');

            //remove file select
            let answer_image_input = childQuestionAdd.find('.answer_file_' + i);
            childQuestionAdd.find('.answerDiv_' + i).find('.col-md-11').find('.file-input').remove();
            answer_image_input.attr('name', addChildQuestionName + '[' + childQuestionAddNumber + '][answers][' + i + '][file]');
            childQuestionAdd.find('.answerDiv_' + i).find('.col-md-11').append(answer_image_input);
            renderInputFile(childQuestionAdd.find('.answerDiv_' + i).find('.col-md-11').find('input[type=file]'));
        }

        $('#list-childQuestion').append(childQuestionAdd);
        $('#childQuestionsNumber').val(currentChildQuestion);
        $('#showChildQuestionNumber').html(currentChildQuestion);
    } else {
        $('#addChildQuestionBtnDiv').addClass('hidden');
    }
});

$('#list-childQuestion').on('click', '.childQuestion_delete', function () {
    let currentChildQuestion = $('#childQuestionsNumber').val();
    if (currentChildQuestion > 1) {
        Swal.fire({
            title: trans('backend.actions.are_you_sure'),
            text: trans('backend.actions.you_will_delete_this'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: trans('backend.actions.yes')
        }).then((result) => {
            if (result.value) {
                $('#childQuestionsNumber').val(currentChildQuestion - 1);
                $('#showChildQuestionNumber').html(currentChildQuestion - 1);
                $('#addChildQuestionBtnDiv').removeClass('hidden');

                let childQuestionDivId = $(this).attr('data-childQuestionId');
                $('#list-childQuestion #' + childQuestionDivId).remove();
            }
        });
    }
});
