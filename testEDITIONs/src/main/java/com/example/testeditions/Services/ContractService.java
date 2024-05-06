package com.example.testeditions.Services;

import com.example.testeditions.Entites.Contract;

import java.util.List;
import java.util.Optional;

public interface ContractService {

    List<Contract> getAllContracts();

    Optional<Contract> getContractById(Long id);

    Contract createContract(Contract contract);

    Contract updateContract(Long id, Contract newContract);

    void deleteContract(Long id);
}
