package com.examplecontroleFerramentas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "emprestimos")
public class Emprestimo {

    @Id
    private Integer id;

    private String usuario_id;
    private String ferramentas_id;
    private LocalDate data_emprestimo;
    private LocalDate data_devolucao;

    public Emprestimo() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(String usuario_id) {
        this.usuario_id = usuario_id;
    }

    public String getFerramentas_id() {
        return ferramentas_id;
    }

    public void setFerramentas_id(String ferramentas_id) {
        this.ferramentas_id = ferramentas_id;
    }

    public LocalDate getData_emprestimo() {
        return data_emprestimo;
    }

    public void setData_emprestimo(LocalDate data_emprestimo) {
        this.data_emprestimo = data_emprestimo;
    }

    public LocalDate getData_devolucao() {
        return data_devolucao;
    }

    public void setData_devolucao(LocalDate data_devolucao) {
        this.data_devolucao = data_devolucao;
    }
}