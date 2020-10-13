$(function(){
    $(".input_area input[type='text']").keypress(function(e){
        if(e.keyCode == 13  && $(this).val().length > 0){ //엔터를 누를경우와 입력하고 있는 input에 값이 있을 때 실행하는 조건문
            var _val = $(this).val(); //val() 값을 가져오는거. 입력된 input의 내용을 담는 변수
            var _class =$(this).attr("class"); //의 클래스명을 담는 변수 inputclass라는 안에 들어있는 내용을 출력하게되는 ..?
            var _time; //_time에 시간 관련 변수를 합하여 저장

            //현재 시간 구하기
            var _data = new Date(); //pc의 전체 시간 정보
            var _hh = _data. getHours(); //시간 정보 중 시간~~hour만 저장
            var _mm = _data. getMinutes(); // 시간 정보 중 분(minutes)만 저장
            var _apm = "오전";
            if(_hh > 12){
                _apm = "오후"
                _hh = _hh - 12; //기존 시간변수(_hh)에서 12를 빼고 다시 _hh에 저장
            }
            if(_hh < 10) _hh = "0" + _hh; //{한 줄 일땐 생략가능 }. 시간이 한자리일경우(0~9) 앞에 문자(0)을 추가
            if(_mm < 10) _mm = "0" + _mm; //분이 한자리일경우(0~9) 앞에 문자(0)을 추가
            _time = _apm+":"+_hh+":"+_mm; //_ct에 시간관련 변수를 합하여 저장   위의 내용이 다 _ct에 다 담김
            // 현재 시간 구하기 끝
        
            //말풍선 태그를 추가하는 append           
            $(".chat_area").append('<div class="item '+_class+'"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+_time+'</span></div></div>')
           
            setTimeout(function(){
                $(".chat_area .item").last().addClass("on"); //트랜지션 효과를 쓰기 위해 0.01초 딜레이타임 이후 on클래스를 추가해줌 겹치면 안됨
                //내용 추가 후 스크롤을 맨 밑으로 내림
                var _itemH = $(".chat_area .item").height() + 15; //아이템의 높이 체크
                var _itemC = $(".chat_area .item").length; //아이템의 갯수 체크
                var _itemTotal = _itemH *  _itemC - 15 //위의 높이와 갯수를 계산해 총 높이값 저장
                //채팅창이 맨 밑으로 갈 수 있게 하는 스크롤 애니메이션
                $(".chat_area").stop().animate({  //기존의 애니메이션은 스탑시키고 애니메이션 실행시켜라
                    scrollTop:_itemTotal
                },500);
            },10)



            $(this).val(""); //값을 입력하겠다..? input의 입력된 내용을 삭제
        };
    });
})