package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Pedido;

public interface PedidoRepository extends CrudRepository<Pedido, Integer> {
}
