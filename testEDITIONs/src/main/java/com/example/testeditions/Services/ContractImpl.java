package com.example.testeditions.Services;

import com.example.testeditions.Entites.Contract;
import com.example.testeditions.Repositories.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractImpl implements ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Override
    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    @Override
    public Optional<Contract> getContractById(Long id) {
        return contractRepository.findById(id);
    }

    @Override
    public Contract createContract(Contract contract) {
        return contractRepository.save(contract);
    }

    @Override
    public Contract updateContract(Long id, Contract newContract) {
        Optional<Contract> existingContractOptional = contractRepository.findById(id);
        if (existingContractOptional.isPresent()) {
            Contract existingContract = existingContractOptional.get();
            existingContract.setContent(newContract.getContent());
            existingContract.setDate_contract(newContract.getDate_contract());
            existingContract.setStatutC(newContract.getStatutC());
            existingContract.setDureeC(newContract.getDureeC());
            existingContract.setChoixC(newContract.getChoixC());
            // Mettez à jour d'autres champs selon vos besoins

            return contractRepository.save(existingContract);
        } else {
            // Gérer l'absence du contrat avec l'ID spécifié
            return null;
        }
    }


    @Override
    public void deleteContract(Long id) {
        contractRepository.deleteById(id);
    }
}
