package com.examplecontroleFerramentas.controller;

import com.examplecontroleFerramentas.model.Usuario;
import com.examplecontroleFerramentas.repository.UsuarioRepository;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Usuario cadastrar(@RequestBody @NonNull Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}
