package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.DetallePedido;

public interface DetallePedidoRepository extends CrudRepository<DetallePedido, String> {
}
