package com.examplecontroleFerramentas.controller;

import com.examplecontroleFerramentas.model.Ferramenta;
import com.examplecontroleFerramentas.repository.FerramentaRepository;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ferramentas")
public class FerramentaController {

    private final FerramentaRepository ferramentaRepository;

    public FerramentaController(FerramentaRepository ferramentaRepository) {
        this.ferramentaRepository = ferramentaRepository;
    }

    @GetMapping
    public List<Ferramenta> listar() {
        return ferramentaRepository.findAll();
    }

    @PostMapping
    public Ferramenta cadastrar(@RequestBody @NonNull Ferramenta ferramenta) {
        return ferramentaRepository.save(ferramenta);
    }
}