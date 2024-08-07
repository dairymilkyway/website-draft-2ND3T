$(document).ready(function () {
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    console.log('CSRF Token:', csrfToken);
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': csrfToken
        }
    });
    var table = $('#customerTable').DataTable({
        ajax: {
            url: "/api/customers",
            dataSrc: ""
        },
        dom: '<"top"lBf>rt<"bottom"ip><"clear">',
        buttons: [
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf"></i> Export to PDF',
                className: 'btn btn-danger mr-2',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            }
        ],
        columns: [
            {
                data: 'id',
                title: 'ID'
            },
            {
                data: 'name',
                title: 'Name'
            },
            {
                data: 'user.email',
                title: 'Email'
            },
            {
                data: 'address',
                title: 'Address'
            },
            {
                data: 'number',
                title: 'Number'
            },
            {
                data: 'user.role',
                title: 'Role'
            },
            {
                data: 'user.status',
                title: 'Status'
            },
            {
                data: null,
                title: 'Change Status',
                render: function (data, type, row) {
                    return `<button class="btn btn-warning change-status-btn" data-id="${row.user.id}" data-name="${row.name}" data-status="${row.user.status}">Change Status</button>`;
                }
            },
            {
                data: null,
                title: 'Change Role',
                render: function (data, type, row) {
                    return `<button class="btn btn-info change-role-btn" data-id="${row.user.id}" data-name="${row.name}" data-role="${row.user.role}">Change Role</button>`;
                }
            },
            {
                data:null,
                title: 'Actions',
                render:function (data,type,row){
                    return `<a href='#' class='btn btn-sm btn-danger deleteBtn' data-id="${data.id}"><i class='fas fa-trash'></i> Delete</a>`;
                }
            }
        ],
        responsive: true,
        order: [[0, 'asc']], // Sort by ID column ascending by default
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search...",
            lengthMenu: "Show _MENU_ entries",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            paginate: {
                first: "First",
                last: "Last",
                next: "Next",
                previous: "Previous"
            },
            emptyTable: "No data available in table"
        },
        headerCallback: function(thead, data, start, end, display) {
            $(thead).find('th').css('background-color', '#000000'); // Set black background for header cells
            $(thead).find('th').css('color', '#ffffff'); // Set white text color for header cells
        }
    });

    $(document).ready(function () {
        // Initialize jQuery validation
        $('#customerForm').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                confirm_password: {
                    required: true,
                    equalTo: '#password'
                },
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                address: {
                    required: true
                },
                number: {
                    required: true
                },
                img_path: {
                    // Optional: Validation rules for image upload if needed
                    // accept: "image/jpeg, image/png", // Example for accepted file types
                    // filesize: 2048, // Example for max file size in bytes (2MB)
                }
            },
            messages: {
                email: {
                    required: "Email address is required",
                    email: "Please enter a valid email address"
                },
                password: {
                    required: "Password is required",
                    minlength: "Password must be at least 6 characters long"
                },
                confirm_password: {
                    required: "Please confirm your password",
                    equalTo: "Passwords do not match"
                },
                first_name: {
                    required: "First name is required"
                },
                last_name: {
                    required: "Last name is required"
                },
                address: {
                    required: "Address is required"
                },
                number: {
                    required: "Phone number is required"
                },
                img_path: {
                    // Optional: Custom messages for image upload validation if needed
                    // accept: "Please upload only JPG or PNG images",
                    // filesize: "File size cannot exceed 2MB"
                }
            },
            errorClass: "error-message",
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
            highlight: function (element) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element) {
                $(element).removeClass('is-invalid');
            },
            submitHandler: function (form) {
                event.preventDefault();
                var formData = new FormData(form);

                $.ajax({
                    type: "POST",
                    url: "/api/register",
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    // dataType: "json",
                    success: function (data) {
                        // Handle success response
                        console.log("Customer created successfully:", data);
                        window.location.href = '/login';
                    },
                    error: function (error) {
                        // Handle error response
                        console.error("Error creating customer:", error);
                        // Example: Display error messages to the user
                    }
                });
            }
        });
    });

    //Login
    // submitHandler: function(form) {
            //     event.preventDefault();
            //     var formData = new FormData(form);
            //     $.ajax({
            //         url: '/api/login', // Adjust URL as needed
            //         method: 'POST',
            //         data: formData,
            //         processData: false,
            //         contentType: false,
            //         success: function(response) {
            //             console.log(response);
            //             alert(response.message);
            //             window.location.href = response.redirectUrl;
            //         },
            //         error: function(xhr, status, error) {
            //             console.error(error);
            //             // Handle error
            //             alert('Invalid credentials. Please try again.');
            //         }
            //     });
            // }
            $(document).ready(function() {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $('#loginForm').validate({
                    rules: {
                        email: {
                            required: true,
                            email: true
                        },
                        password: {
                            required: true
                        }
                    },
                    messages: {
                        email: {
                            required: "Please enter your email address",
                            email: "Please enter a valid email address"
                        },
                        password: {
                            required: "Please enter your password"
                        }
                    },
                    errorClass: "error-message",
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
            highlight: function (element) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element) {
                $(element).removeClass('is-invalid');
            },
                    submitHandler: function(form) {
                        // Prevent default form submission
                        // event.preventDefault();

                        // Handle AJAX request
                        var formData = new FormData(form);
                        $.ajax({
                            url: '/api/login',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

                            },
                            success: function(response) {
                                alert('User logged in successfully!');
                                localStorage.setItem('token', response.token); // Store the token in localStorage
                                // console.log('Stored token:', localStorage.getItem('token')); // Verify the token is stored
                                window.location.href = response.redirect_url;
                            },
                            error: function(xhr) {
                                alert('Error: ' + xhr.responseJSON.message);
                                console.log(xhr.responseJSON.errors);
                            }
                        });
                    }
                });

                // Move the submit handler outside of validate configuration to avoid nesting issues
                $('#loginForm').submit(function(event) {
                    event.preventDefault();
                    if ($('#loginForm').valid()) {
                        // $('#loginForm').submitHandler(this);
                    }
                });

            });

                $('#logout-button').on('click', function(e) {
                    e.preventDefault(); // Prevent default action of the link
                    console.log('Logout button clicked'); // Debugging statement
                    var token = localStorage.getItem('token');
                    console.log('Token:', token); // Debugging statement
                    $.ajax({
                        url: '/api/logout',
                        type: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        },
                        success: function(response) {
                            alert(response.message);
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        },
                        error: function(xhr, status, error) {
                            // alert('Logout failed: ' + xhr.responseText);
                        }
                    });
                });

                $('#logoutButton').on('click', function(e) {
                    e.preventDefault(); // Prevent default action of the link
                    console.log('Logout button clicked'); // Debugging statement
                    var token = localStorage.getItem('token');
                    console.log('Token:', token); // Debugging statement
                    $.ajax({
                        url: '/api/logoutAdmin',
                        type: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        },
                        success: function(response) {
                            alert(response.message);
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        },
                        error: function(xhr, status, error) {
                            // alert('Logout failed: ' + xhr.responseText);
                        }
                    });
                });

    // Handle Change Status button click
    $('#customerTable tbody').on('click', 'button.change-status-btn', function () {
        var userId = $(this).data('id');
        var userName = $(this).data('name');
        var userStatus = $(this).data('status');

        $('#statusName').val(userName);
        $('#statusDropdown').val(userStatus);
        $('#statusUserId').val(userId);

        $('#changeStatusModal').modal('show');
    });

    // Handle Save Status button click
    $('#saveStatusBtn').on('click', function () {
        var userId = $('#statusUserId').val();
        var userStatus = $('#statusDropdown').val();

        $.ajax({
            type: "PUT",
            url: `/api/users/${userId}/status`,
            data: {
                status: userStatus,
                _token: $('meta[name="csrf-token"]').attr('content')
                
            },
            success: function () {
                $('#changeStatusModal').modal('hide');
                table.ajax.reload();
                showAlert('success', 'Customer status updated successfully.');
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    // Handle Change Role button click
    $('#customerTable tbody').on('click', 'button.change-role-btn', function () {
        var userId = $(this).data('id');
        var userName = $(this).data('name');
        var userRole = $(this).data('role');

        $('#roleName').val(userName);
        $('#roleDropdown').val(userRole);
        $('#roleUserId').val(userId);

        $('#changeRoleModal').modal('show');
    });

    // Handle Save Role button click
    $('#saveRoleBtn').on('click', function () {
        var userId = $('#roleUserId').val();
        var userRole = $('#roleDropdown').val();

        $.ajax({
            type: "PUT",
            url: `/api/users/${userId}/role`,
            data: {
                role: userRole,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function () {
                $('#changeRoleModal').modal('hide');
                table.ajax.reload();
                showAlert('success', 'Customer role changed successfully.');
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
    //fetchuser

    // $(document).ready(function() {
    //     $.ajax({
    //         url: '/api/fetchuser',
    //         method: 'GET',
    //         success: function(response) {
    //             console.log('Reloaded User Data:', response); // Log the response for debugging

    //             if (response.customer) {
    //                 let fullName = response.customer.name.split(' ');
    //                 $('#first_name').val(fullName[0]);
    //                 $('#last_name').val(fullName.length > 1 ? fullName.slice(1).join(' ') : '');
    //                 $('#email').val(response.user.email);
    //                 $('#address').val(response.customer.address);
    //                 $('#number').val(response.customer.number);
    //                 if (response.customer.img_path) {
    //                     $('#profile-pic').attr('src', response.customer.img_path);
    //                 }
    //             }
    //         },
    //         error: function(xhr) {
    //             console.error('Error:', xhr.responseText);  // Log any errors for debugging
    //         }
    //     });
    // });
//updatepicture
$(document).ready(function() {
    // Show change profile picture modal
    $('#changeProfilePicBtn').click(function() {
        $('#changeProfilePicModal').removeClass('hidden');
    });

    // Close change profile picture modal
    $('#cancelChangePicBtn').click(function() {
        $('#changeProfilePicModal').addClass('hidden');
    });

    // Handle profile picture form submission
    $('#changeProfilePicForm').submit(function(e) {
        e.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: '/api/update-picture', // Ensure this matches your Laravel route
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                // Handle success response
                console.log(response);
                // Update profile picture in the UI
                $('#profile-pic').attr('src', response.img_url);
                // Close the modal
                $('#changeProfilePicModal').addClass('hidden');
            },
            error: function(error) {
                // Handle errors
                console.log(error);
            }
        });
    });
});


    //update
    $(document).ready(function() {
        $.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) || /^[A-Za-z\s]+$/.test(value);
        }, "Letters only please");
        $.validator.addMethod("numbersonly", function(value, element) {
            return this.optional(element) || /^[0-9]+$/.test(value);
        }, "Numbers only please");

        function fetchUser() {
            $.ajax({
                url: '/api/fetchuser',
                method: 'GET',
                success: function(response) {
                    console.log('Reloaded User Data:', response);

                    if (response.customer) {
                        let fullName = response.customer.name.split(' ');
                        $('#first_name').val(fullName[0]);
                        $('#last_name').val(fullName.length > 1 ? fullName.slice(1).join(' ') : '');
                        $('#email').val(response.user.email);
                        $('#address').val(response.customer.address);
                        $('#number').val(response.customer.number);
                        if (response.customer.img_path) {
                            $('#profile-pic').attr('src', response.customer.img_path);
                        }
                    }
                },
                error: function(xhr) {
                    console.error('Error:', xhr.responseText);
                }
            });
        }
        fetchUser();

        $('#updateProfileBtn').click(function() {
            $('#update_first_name').val($('#first_name').val());
            $('#update_last_name').val($('#last_name').val());
            $('#update_email').val($('#email').val());
            $('#update_address').val($('#address').val());
            $('#update_number').val($('#number').val());

            $('#updateProfileModal').removeClass('hidden');
        });

        $('#cancelUpdateBtn').click(function() {
            $('#updateProfileModal').addClass('hidden');
        });

        $('#updateProfileForm').validate({
            rules: {
                first_name: {
                    required: true,
                    lettersonly: true
                },
                last_name: {
                    required: true,
                    lettersonly: true
                },
                email: {
                    required: true,
                    email: true
                },
                password: {
                    minlength: 6
                },
                confirm_password: {
                    equalTo: '#password'
                },
                address: {
                    required: true
                },
                number: {
                    required: true,
                    numbersonly: true
                }
            },
            messages: {
                first_name: {
                    required: "First name is required",
                    lettersonly: "Letters only please"
                },
                last_name: {
                    required: "Last name is required",
                    lettersonly: "Letters only please"
                },
                email: {
                    required: "Email address is required",
                    email: "Please enter a valid email address"
                },
                password: {
                    minlength: "Password must be at least 6 characters long"
                },
                confirm_password: {
                    equalTo: "Passwords do not match"
                },
                address: {
                    required: "Address is required"
                },
                number: {
                    required: "Phone number is required",
                    numbersonly: "Numbers only please"
                }
            },
            errorElement: 'span',
            errorClass: 'text-red-500',
            errorPlacement: function(error, element) {

                error.insertAfter(element);
            },
            submitHandler: function(form) {
                const data = {
                    first_name: $('#update_first_name').val(),
                    last_name: $('#update_last_name').val(),
                    email: $('#update_email').val(),
                    password: $('#update_password').val(),
                    address: $('#update_address').val(),
                    number: $('#update_number').val(),
                };
                $.ajax({
                    url: '/api/update-profile',
                    method: 'PUT',
                    data: data,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function(response) {
                        fetchUser();
                        alert('Profile updated successfully!');
                        $('#updateProfileModal').addClass('hidden');
                    },
                    error: function(error) {
                        console.error('Error updating profile:', error);
                        alert('Failed to update profile. Please try again.');
                    }
                });
            }
        });

    $('#deactivateAccountBtn').click(function() {
        $('#deactivateAccountModal').removeClass('hidden');
    });

    $('#cancelDeactivateBtn').click(function() {
        $('#deactivateAccountModal').addClass('hidden');
    });

    $('#confirmDeactivateBtn').click(function() {
        $.ajax({
            url: '/api/deactivate-account',
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                window.location.href = '/login';
            },
            error: function(error) {
                console.error('Error deactivating account:', error);
                alert('deactivate account.');
            }
        });
    });
    });

    
 // Handle delete button click
 $('#customerTable tbody').on('click', 'a.deleteBtn', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    var $row = $(this).closest('tr');
    bootbox.confirm({
        message: "Do you want to delete this customer?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    type: "DELETE",
                    url: `/api/customers/${id}`,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    success: function (data) {
                        table.row($row).remove().draw();
                        showAlert('success', 'Customer deleted successfully.');
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
        }
    });
});

});
