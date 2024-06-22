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
        return "RegisterPage";
    }

    @GetMapping("/login")
    public String login() {
        return "LoginPage";
    }

    @GetMapping("/result")
    public String result() {
        return "ResultPage"; // 로그인 성공 후 이동할 페이지
    }
}
