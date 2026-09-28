package com.examplecontroleFerramentas.repository;

import com.examplecontroleFerramentas.model.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Integer> {

}