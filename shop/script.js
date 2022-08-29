var itemurl="https://monoame.com/awi_class/api/command.php?type=get&name=itemdata";

var shoplist={};

shoplist.name= "MyList 購物清單";
shoplist.time= "2022/04/06";

shoplist.list=[
	{name:"肉桂捲", price:110},
	{name:"檸檬塔", price:130},
	{name:"焙茶戚風蛋糕", price:180},	
	{name:"可麗露", price:50},	
	{name:"紐約起司蛋糕", price:120},	
	{name:"提拉米蘇", price:140},	
	{name:"布朗尼", price:100}
];

// $.ajax({
// 	url: itemurl,
// 	success: function(res){
// 		shoplist.list=JSON.parse(res)
// 		showlist();
// 	}
// })


var item_html="<li id={{id}} class='buy_item'>{{num}}.{{item}}<div class='price'>{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>X</div></li>";

var total_html="<li class='buy_item total'>總價<div class='price'>{{price}}</div></li>";


function showlist(){
	$("#items_list").html("");
	var total_price=0;
	for(var i=0; i<shoplist.list.length; i++){
		var item = shoplist.list[i];
		var item_id = "buyitem_"+i; 
		var del_item_id = "del_buyitem_" +i
		
		total_price+= parseInt(item.price);
		
		var current_item_html=
				item_html.replace("{{num}}", i+1)
									.replace("{{item}}", item.name)
									.replace("{{price}}", item.price)
									.replace("{{id}}", item_id)
									.replace("{{del_id}}", del_item_id)
									.replace("{{del_item_id}}",i);

		$("#items_list").append(current_item_html);
		$("#"+del_item_id).click(
			function(){			
				remove_item(parseInt($(this).attr("data-delid")));
			}
		)
	}
	var current_total_html=
			total_html.replace("{{price}}", total_price);
	$("#items_list").append(current_total_html);
}
showlist();

$(".addbtn").click(
	function(){
		shoplist.list.push(
		{
			name: $("#input_name").val(),
			price: $("#input_price").val()
		}
	)
		$("#input_name").val(""),
		$("#input_price").val("");
		showlist();
	}
)

function remove_item(id){
  shoplist.list.splice(id,1);
  showlist();
}