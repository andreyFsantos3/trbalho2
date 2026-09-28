package com.examplecontroleFerramentas.controller;

import com.examplecontroleFerramentas.model.Emprestimo;
import com.examplecontroleFerramentas.repository.EmprestimoRepository;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    private final EmprestimoRepository emprestimoRepository;

    public EmprestimoController(EmprestimoRepository emprestimoRepository) {
        this.emprestimoRepository = emprestimoRepository;
    }

    @GetMapping
    public List<Emprestimo> listar() {
        return emprestimoRepository.findAll();
    }

    @PostMapping
    public Emprestimo cadastrar(@RequestBody @NonNull Emprestimo emprestimo) {
        return emprestimoRepository.save(emprestimo);
    }
}