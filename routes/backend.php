<?php

Route::group([
    'prefix' => 'admin',
    'namespace' => 'Admin',
    'as' => 'admin.',
], function () {
    Route::get('/', 'HomeController@index')->name('home');

    Route::resource('categories', 'CategoryController')->except('create', 'show', 'edit');

    Route::get('users/getData', 'UserController@getData')->name('users.getData');
    Route::resource('users', 'UserController')->except('create', 'show', 'edit');

    Route::get('students/getData', 'StudentController@getData')->name('students.getData');
    Route::resource('students', 'StudentController')->except('create', 'show', 'edit');

    Route::get('tests/getData', 'TestController@getData')->name('tests.getData');
    Route::resource('tests', 'TestController')->except('create', 'show', 'edit');

    Route::group([
        'prefix' => 'questions',
        'as' => 'questions.',
    ], function () {
        Route::get('getData', 'QuestionController@getData')->name('getData');

        Route::get('comments/getData', 'QuestionCommentController@getData')->name('comments.getData');
        Route::resource('comments', 'QuestionCommentController')->except('create', 'store', 'show', 'edit', 'update');
    });
    Route::resource('questions', 'QuestionController')->except('create', 'show', 'edit');
});
