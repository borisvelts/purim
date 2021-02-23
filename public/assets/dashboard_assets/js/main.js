function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(() => {
    // fetch('/dashboard/dashboard-screen').then((e) => console.log(e.body))
    $.get('/dashboard/dashboard-screen', (e) => $('.content').html(e)).then((e) => {
        // ctx = document.getElementById('chartHours').getContext("2d");
        // demo.initChartsPages();
        initChart(document.getElementById('chartHours').getContext('2d'))
    })
    if (getCookie('cart' == "")) {
        $.ajax({
            url: '/cart',
            method: 'POST',
            data: JSON.stringify({ action: 'new' }),
            success: (res) => {
                console.log(res)
                setCookie('cart', res)
            },
            error: () => {

            }
        })
    }
})

async function loadScreen(screen, parent) {
    await $.get('/dashboard/' + screen + '-screen', (e) => $('.content').html(e))
    $('li').each((i, e) => {
        $(e).removeClass('active')
    })
    $(parent).addClass('active')
    switch (screen) {
        case 'dashboard':
            $('#screen_name').html('בקרה')
            // ctx = document.getElementById('chartHours').getContext("2d");
            // demo.initChartsPages();
            initChart(document.getElementById('chartHours').getContext('2d'))
            break
        case 'add_item':
            $('#screen_name').html('הוספת מוצר')
            break
        case 'orders':
            $('#screen_name').html('הזמנות')
            break
        case 'products':
            $('#screen_name').html('מוצרים')
            break
        case 'customers':
            $('#screen_name').html('לקוחות')
            break
        case 'edit_home':
            $('#screen_name').html('עריכת דף הבית')
            break
        case 'publishBlog':
            $('#screen_name').html('פרסם מאמר')
            break
    }
    return;
}

// ************************************
//             add Item
// ************************************
function changeLabel() {
    var label = $('#add_picture_lable')
    label.text(' ')
    var uploadfiles = $("input[name=image]")[0].files;
    for (var i = 0; i < uploadfiles.length; i++) {
        label.text(label.text() + ' , ' + uploadfiles[i].name)
    }
}

async function addCategory(parent) {
    const { value: ipAddress } = await Swal.fire({
        title: 'הוספת קטגוריה',
        input: 'text',
        // inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'נא למלא שדה!'
            }
        }
    })

    if (ipAddress) {
        $.ajax({
            type: "POST",
            url: '/dashboard/category?name=' + ipAddress,
            success: function (msg) {
                $('#category_select').append("<option value='" + msg + "''>" + msg + "</option>").select()
                Swal.fire({
                    title: 'קטגוריה הוספה בהצלחה',
                    icon: 'success',
                    // confirmButtonText: 'Cool',
                    timer: 1500,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                            const content = Swal.getContent()
                            if (content) {
                                const b = content.querySelector('b')
                                if (b) {
                                    b.textContent = Swal.getTimerLeft()
                                }
                            }
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                    }
                })
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Swal.fire({
                    title: 'קרתה תקלה בהוספת קטגוריה ',
                    icon: 'error',
                    confirmButtonText: 'סגור',
                    timerProgressBar: true,
                })
            }
        });
    }
}

$('#add_item_btn').click(() => {
    var formData = new FormData();
    var name = document.getElementById("name").value
    var price = document.getElementById("price").value
    var salePrice = document.getElementById("salePrice").value
    // var salePrice = $('#salePrice').val()
    var saleUntil = document.getElementById("saleUntil").value
    var description = document.getElementById("description").value
    var information = document.getElementById("information").value
    var category = document.getElementById("category_select").value
    var sizes = document.getElementById("sizes").value
    var stock = document.getElementById("stock").value
    // var category = $('#category_select').val()

    var onSale = false;
    if ($('#onSale:checked').length > 0)
        onSale = true;

    if (name == "" || price == "" || description == "" || information == "" || category == "") {
        name == "" ? $('#name').parent().addClass('has-danger') : null;
        price == "" ? $('#price').parent().addClass('has-danger') : null;
        description == "" ? $('#description').parent().addClass('has-danger') : null;
        information == "" ? $('#information').parent().addClass('has-danger') : null;
        category == "" ? $('#category_select').parent().addClass('has-danger') : null;
        return null;
    }
    else {
        $('#add_item_btn').prop('disabled', true)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('salePrice', salePrice)
        formData.append('saleUntil', saleUntil)
        formData.append('description', description)
        formData.append('information', information)
        formData.append('category', category)
        formData.append('sizes', sizes)
        formData.append('stock', stock)
        var uploadfiles = $("input[name=image]")[0].files;
        for (var i = 0; i < uploadfiles.length; i++) {
            formData.append("image", uploadfiles[i]);
        }
        xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = (evt.loaded / evt.total) * 100;
                $('#upload_progress').css('width', percentComplete)
            }
        }, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                $('#add_item_btn').prop('disabled', false)
                if (xhr.status === 200) {
                    Swal.fire({
                        title: 'מוצר הוסף בהצלחה',
                        icon: 'success',
                        // confirmButtonText: 'Cool',
                        timer: 1000,
                        timerProgressBar: true,
                        onBeforeOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                                const content = Swal.getContent()
                                if (content) {
                                    const b = content.querySelector('b')
                                    if (b) {
                                        b.textContent = Swal.getTimerLeft()
                                    }
                                }
                            }, 100)
                        },
                        onClose: () => {
                            clearInterval(timerInterval)
                        }
                    })
                } else {
                    Swal.fire({
                        title: 'קרתה תקלה בהעלאת מוצר',
                        text: xhr.response,
                        icon: 'error',
                        confirmButtonText: 'סגור',
                        timerProgressBar: true,
                    })
                }
            }
        }
        xhr.open("POST", "/dashboard/item", true);
        xhr.send(formData);

    }
})
// ************************************
//             add Item
// ************************************


function initChart(ele) {
    Chart(ele, {
      type: 'line',

      data: {
        labels: ["ינו'", "פבר'", "מרץ", "אפר", "מאי", "יוני", "יולי", "אוג'", "ספט'", "אוק'"],
        datasets: [{
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [0]
          },
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });
}