$(document).ready(function () {
    var table = $('#customerTable').DataTable({
        ajax: {
            url: "/api/customers",
            dataSrc: ""
        },
        dom: '<"top"lBf>rt<"bottom"ip><"clear">',
        buttons: [
            {
                extend: 'pdfHtml5',
                text: 'Export to PDF',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            }
        ],
        columns: [
            { data: "id" },
            { data: "name" },
            { data: "user.email" },
            { data: "address" },
            { data: "number" },
            { data: "user.role" },
            { data: "user.status" },
            {
                data: null,
                render: function (data, type, row) {
                    return `<button class="btn btn-warning change-status-btn" data-id="${row.user.id}" data-name="${row.name}" data-status="${row.user.status}">Change Status</button>`;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<button class="btn btn-info change-role-btn" data-id="${row.user.id}" data-name="${row.name}" data-role="${row.user.role}">Change Role</button>`;
                }
            },
            {
                data:null,
                render:function (data,type,row){
                    return `<a href='#' class='deletebtn' data-id="${data.id}"><i class='fas fa-trash' style='font-size:24px; color:red'></i></a>`;
                }
            }
        ]
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
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
    
    //delete
    $('#customerTable tbody').on('click', 'a.deletebtn', function (e) {
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
                        dataType: "json",
                        success: function (data) {
                            table.row($row).remove().draw();
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
