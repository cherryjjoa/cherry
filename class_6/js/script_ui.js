$(function(){
    $(".box_intro .btn_setting").click(function(){
        //$(".box_intro").hide();
        $(".box_intro").slideUp(); //첫화면 숨김 애니메이션. slideUp 대신 show가능
        loadDataFn() //json 데이터 호출 함수
    });
    var complateData; //json데이터를 담는 변수;
    var seatSave = []; //선택된 자리 정보를 담는 배열
    var seatPriceSave = 0; //선택된 자리 가격을 합산 저장하는 변수



        function loadDataFn(){
            $.ajax({
                url:"js/data.json",
                dataType:"json",
                success:function(result){
                    complateData = result.seatInfo;
                    settingSeatFn(); //자리 세팅 함수 호출
                }
            });
        }
        //자리 세팅 함수
        function settingSeatFn(){
            
            //처음으로 돌아가기했을 때 선택된 정보 초기화
            $(".txt_info_number").text("");
            $(".txt_info_total").text("0"); 

            for(var i=0; i<complateData.length; i++){
                //데이터 파싱
                var n = complateData[i].name;
                var p = complateData[i].price;
                var r = complateData[i].reserve;
                $(".section.reservation > ol").append("<li class='unit'><button data-price='"+p+"' "+r+">"+n+"</button></li>")
            
            }
            //$(".section.reservation").show();
            $(".section.reservation").slideDown(); //자리선택 노출 애니메이션
            $(".section.reservation .unit button").click(function(){
                $(this).toggleClass("select");
                seatSave = []; //배열 초기화
                seatPriceSave = 0; //가격정보 초기화
                   //select라는 클래스를 갖고 있는 정보만 저장하는 for문
                for(var i=0; i<complateData.length; i++){
                    //unit이라는 클래스를 갖고 있는 li들 중에서 select라는 클래스를 갖고 있는 버튼만 true로 출력
                 var boo = $(".section.reservation .unit").eq(i).find("button").hasClass("select"); 
                 if(boo){
                    seatSave.push(complateData[i].name);  //좌석정보 배열에 선택좌석 저장
                    seatPriceSave += Number(complateData[i].price); //선택좌석 가격합산 +=축적의미                
                }
                                        
                }
                //console.log(seatSave, seatPriceSave);
                //저장된 배열과 변수를 html에 업데이트하기(text)
                $(".txt_info_number").text(seatSave);
                $(".txt_info_total").text(seatPriceSave);
            });
            //완료버튼 선택
            $(".btn_submit").click(function(){
                                        //hide
                $(".section.reservation").slideUp(); //
                $(".section.complete").slideDown();
                                        //show

                //좌석 이름 저장된 배열로 업데이트 (여기 이해 안됨 ㅜㅜ 왜 넣는지)
                $(".section.complete .txt_number").text(seatSave);
                //좌석 가격 저장된 변수로 업데이트
                $(".section.complete .txt_price > strong").text(seatPriceSave);

            });
            //리셋버튼
            $(".section.complete .btn_reset").click(function(){
                $(".section.complete").slideUp();    //완료 div를 숨김
                $(".box_intro").slideDown();   //첫화면 div를 보여줌
                $(".section.reservation > ol .unit").remove();   //json데이터 로드후 셋팅된 자리 li들을 삭제
            });
        };
})