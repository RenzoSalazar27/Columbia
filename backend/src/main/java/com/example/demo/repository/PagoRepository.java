package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Pago;

public interface PagoRepository extends CrudRepository<Pago, Integer> {
}
