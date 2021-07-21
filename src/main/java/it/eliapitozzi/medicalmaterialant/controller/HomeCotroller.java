package it.eliapitozzi.medicalmaterialant.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Elia
 */
@Controller
public class HomeCotroller {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}
