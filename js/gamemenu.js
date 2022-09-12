/*
	Game Menu Template
	Develop by Leandro Curioso
	leandro.curioso@gmail.com	
*/

$(document).ready(function(e){
	
	//Audio tags
	var audio = {
		sfx:{
			select:	document.getElementById("sfx-select"),
			background: document.getElementById("sfx-background"),
			move:document.getElementById("sfx-move")
		}
	};
		
	//Show loading
	function showLoading(){
		$( "#loading" ).fadeIn("slow");
	};
	
	//Hide loading
	function hideLoading(){
		$( "#loading" ).hide();
	};
	
	//Back main menu
	function backMainMenu(){
		$( ".sub-menu").hide();
		$( "#credits").hide();
		$( "#mint").hide();
		$( "#roadmap").hide();		
		$( "#main-menu" ).fadeIn("slow");
		return false;
	};
	
	//Load submenu
	function loadSubMenu(mainMenu, mainOptions , _value){
		var body = $("body");
		var parentId = config["mainMenu"][_value].id;
		var subOptions = "<ul style='display:none;' data-parent-id='"+parentId+"' class='sub-menu' id='sub-menu-"+parentId+"'>";
		var subMenu = Object.keys(config["mainMenu"][_value].subMenu.options);
		var opt = {};
		$.each(subMenu, function(key,value){
			opt = config["mainMenu"][_value].subMenu.options[value];
			subOptions += "<li data-pos='"+key+"' data-id='"+_value+"' class='sub-menu-opt'>"+opt.title+"";
			if(opt.date != undefined){
				subOptions += " <small>"+opt.date+"</small>";
			}
			
			subOptions += "</li>";
		});
		body.append(subOptions+"<li class='back'>Back</li></ul>")
	};
	
	//Show main menu
	function showMainMenu(){
	
		//Add options in main menu
		var mainMenu = $("#main-menu");
		var mainOptions = Object.keys(config["mainMenu"]);
		
		$.each(mainOptions,function(key,value){
			//Load submenu
			if(config["mainMenu"][value].subMenu != undefined){
				loadSubMenu(mainMenu, mainOptions , value);
				mainMenu.append("<li data-type='submenu' data-pos='"+key+"' id='"+config["mainMenu"][value].id+"' class='main-menu-opt'>"+config["mainMenu"][value].title+"</li>");
			}else{
				mainMenu.append("<li data-id='"+value+"' data-pos='"+key+"' id='"+config["mainMenu"][value].id+"' class='main-menu-opt'>"+config["mainMenu"][value].title+"</li>");
			}
						
		});
		mainMenu.fadeIn("slow");
	};
	
	//Configuration vars
	var config = {
		timeoutLoadingTime:4000,
		mainMenu:{
			startGame:{
				id:"opt-credits",
				title: "Roadmap",
				callback:function(){
					$("#roadmap,#back-roadmap").fadeIn("slow");
				}
			},
			loadGame:{
				id:"opt-load-game",
				title: "Pass Benefits",
				subMenu:{
					options:{
						opt0: {
							title: "Community",
							callback:function(){
								showLoading();
							}
						},
						opt1: {
							title: "Apha Calls",
							callback:function(){
								showLoading();
							}
						},
						opt2: {
							title: "Tools & Info",

							callback:function(){
								showLoading();
							}
						},
						opt3: {
							title: "Allowlisting",
							callback:function(){
								showLoading();
							}
						},
						opt4: {
							title: "Gaming Guild",
							callback:function(){
								showLoading();
							}
						},
						opt5: {
							title: "Education",
							callback:function(){
								showLoading();
							}
						},
						opt6: {
							title: "Network & Jobs",
							callback:function(){
								showLoading();
							}
						}
					}
				}
			},
			options:{
				id:"opt-options",
				title: "Official Links",
				subMenu:{
					options:{
						opt0: {
							title: "Twitter",
							callback:function(){
								window.location.href = "https://twitter.com/degangxyz";
							}
						},
						opt1: {
							title: "Discord",
							callback:function(){
								window.location.href = "https://discord.gg/degang";
							}
						},
						opt2: {
							title: "Medium",
							callback:function(){
								window.location.href = "https://degang.medium.com";
							}
						},
						opt3: {
							title: "OpenSea",
							callback:function(){
								window.location.href = "https://opensea.com";
							}
						}
					}
				}
			},
			credits:{
				id:"opt-credits",
				title: "Reach Out",
				callback:function(){
					$("#credits,#back-credits").fadeIn("slow");
				}
			}
		}
	};
	
	//Hover on main manu
	$(this).on("mouseenter","#main-menu li",function(){
	  var mainMenuLst = $("#main-menu li");
	  mainMenuLst.removeClass("selected-opt");
	  $(this).addClass("selected-opt");
	  audio.sfx.select.load();
	  audio.sfx.select.play();
	});
	
	//Hover in submenu
	$(this).on("mouseenter",".sub-menu li",function(){
	  var subMenuLst = $(".sub-menu li");
	  subMenuLst.removeClass("selected-opt");
	  $(this).addClass("selected-opt");
	  audio.sfx.select.load();
	  audio.sfx.select.play();
	})
	
    //Click in submenu option
	$(this).on("click",".sub-menu li",function(e){
		
		if($(this).hasClass("back")){	
			return backMainMenu();
			audio.sfx.back.play();
		}
		
		var dataId = $(this).attr("data-id");
		var dataPos = $(this).attr("data-pos");
		audio.sfx.move.play();
		$(".sub-menu").hide();
		config["mainMenu"][dataId].subMenu.options["opt"+dataPos].callback();
	});
	
	//CLick in main menu option
	$(this).on("click",".main-menu-opt",function(e){
		var type = $(this).attr("data-type");
		var id = $(this).attr("id");
		var dataId = $(this).attr("data-id");
		var mainMenu = $("#main-menu");
		var subMenu = $("#sub-menu-"+id+"");
		audio.sfx.move.play();
		mainMenu.hide();
		if(type == "submenu"){
			subMenu.fadeIn("slow");
		}else{
			config.mainMenu[dataId].callback();
		}

	});
	
	//On load
	$(window).on("load", function(e){
		showLoading();
		setTimeout(function(){
		hideLoading();	
		audio.sfx.background.play();
		showMainMenu();
		},config.timeoutLoadingTime);
	});
	
});