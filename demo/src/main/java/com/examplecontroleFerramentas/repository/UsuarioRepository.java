package com.examplecontroleFerramentas.repository;

import com.examplecontroleFerramentas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}