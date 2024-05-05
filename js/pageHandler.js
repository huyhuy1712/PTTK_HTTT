// Hàm này trả về mảng các phần tử cho trang
// Lần lượt các tham số được truyền vào hàm này là : mảng chứa các sản phẩm, số trang muốn hiển thị,
// số lượng sản phẩm 1 trang hiển thị
function GetDataForPage(dataArray, pageNumber, itemsPerPage) {
    var itemsArray = [];
    if (dataArray.length < pageNumber * itemsPerPage) {
        for (var i = pageNumber * itemsPerPage - itemsPerPage; i < dataArray.length; i++) {
            itemsArray.push(dataArray[i]);
        }
    }
    else {
        for (var i = pageNumber * itemsPerPage - itemsPerPage; i < pageNumber * itemsPerPage; i++) {
            itemsArray.push(dataArray[i]);
        }
    }
    return itemsArray;
}
// Hàm này trả về mảng số thứ tự các trang sẽ hiển thị
// Lần lượt các tham số được truyền vào hàm này là : mảng chứa các sản phẩm, số trang muốn hiển thị, 
// số lượng sản phẩm 1 trang hiển thị, số thứ tự trang tối đa hiển thị
function GetNumberOfPages(dataArray, pageNumber, itemsPerPage, maxPage) {
    var numberPages_Array = [];
    var totalPage = Math.ceil(dataArray.length / itemsPerPage);
    var temp1 = 0;
    var temp2 = 0;

    for (i = 1; i < totalPage; i++) {
        temp2 = i * maxPage;
        temp1 = t2 - maxPage + 1;
        if (pageNumber > temp1 && pagpageNumber < temp2) {
            break;
        }
    }

    if(totalPage < t2)
    {
        for(var i = t1; i<=totalPage;i++)
        {
            numberPages_Array.push(i);
        }
    }
    else{
        for(var i = t1; i <= t2; i++)
        {
            numberPages_Array.push(i);
        }
    }
    return numberPages_Array;
}
// Hàm này sẽ trả về số trang tiếp theo khi bấm nút <<
//Lần lượt các tham số được truyền vào hàm này là : mảng số thứ tự các trang sẽ hiển thị, số thứ tự trang tối đa hiển thị
function GetPageNumberForBack(numberPages_Array, maxPage)
{   
    if(numberPages_Array[0] != 1)
    {
        return numberPages_Array[0] - maxPage;
    }
    return 0;
}
// Hàm này sẽ trả về số trang tiếp theo khi bấm nút >>
// Lần lượt các tham số được truyền vào hàm này là : mảng số thứ tự các trang sẽ hiển thị, mảng chứa các sản phẩm,
// số lượng sản phẩm 1 trang hiển thị, số thứ tự trang tối đa hiển thị
function GetPageNumberForNext(numberPages_Array, dataArray , itemsPerPage ,maxPage)
{
    var totalPage = Math.ceil(dataArray.length / itemsPerPage);
    if(numberPages_Array[0] + maxPage <= totalPage)
    {
        return numberPages_Array[0] + maxPage
    }
    return 0;
}

