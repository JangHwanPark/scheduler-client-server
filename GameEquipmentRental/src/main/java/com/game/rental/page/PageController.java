package com.game.rental.page;

import com.game.rental.users.dto.JoinDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/page")
public class PageController {
    @GetMapping("/join")
    public String join(Model model) {
        model.addAttribute("user", new JoinDto());
        // React 회원가입 페이지 URL로 변경
        // return "RegisterPage";
        return "redirect:http://localhost:5173/page/register";
    }

    @GetMapping("/login")
    public String login() {
        // React 로그인 페이지 URL로 변경
        // return "LoginPage";
        return "redirect:http://localhost:5173/page/login";
        // return "forward:/index.html";
    }

    @GetMapping("/result")
    public String result() {
        return "ResultPage"; // 로그인 성공 후 이동할 페이지
    }
}