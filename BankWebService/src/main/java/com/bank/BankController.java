package com.bank;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.data.BankDataRepository;
import com.data.TransactionRepository;
import com.domain.Statement;
import com.domain.Transaction;
import com.domain.User;
import com.domain.UserInfo;

@RestController
public class BankController {

	@Autowired
	BankDataRepository bankDataRepository;

	@Autowired
	TransactionRepository transactionRepository;

	@Autowired
	EntityManager entityManager;

	@PostMapping("/loginUser")
	@CrossOrigin
	public String login(@RequestBody User user) {

		System.out.println(" Request " + user.toString());
		UserInfo userInfo = bankDataRepository.findByUserNameAndPassword(user.getUserName(), user.getPassword());
		if (userInfo != null) {
			System.out.println(" Login Successfully ");// +userInfo.toString());
			return "success";
		}

		System.out.println("Login failed !");

		return "Request Failed";
	}

	@PostMapping("/statement")
	@CrossOrigin
	public List<Transaction> statement(@RequestBody Statement statement) {
		System.out.println(" Request " + statement.toString());

		String query = "select t from Transaction t where t.transactionDate >= :from and  t.transactionDate <= :to  and t.accountType = :accountType";

		TypedQuery<Transaction> typedQuery = entityManager.createQuery(query, Transaction.class);
		typedQuery.setParameter("from", statement.getFrom());
		typedQuery.setParameter("to", statement.getTo());
		typedQuery.setParameter("accountType", statement.getTransactionType());
		// typedQuery.setParameter(4, statement.getTransactionNo());
		List<Transaction> transactions = typedQuery.getResultList();
		return transactions;
	}

	@PostMapping("/transaction")
	@CrossOrigin
	public String transaction(@RequestBody Transaction transaction) {
		System.out.println(" Request " + transaction.toString());
		Transaction transactionObj = transactionRepository.save(transaction);
		if (transactionObj != null) {
			System.out.println("Transaction Successfully" + transactionRepository.findAll().toString());
			return "success";
		}
		return "Transaction Failed";
	}

	@PostMapping("/register")
	@CrossOrigin
	public String register(@RequestBody UserInfo userInfo) {
		System.out.println(" Request " + userInfo.toString());

		UserInfo userInfoExits = bankDataRepository.findByPanNumber(userInfo.getPanNumber());
		if (userInfoExits == null) {
			bankDataRepository.save(userInfo);
			System.out.println(" User Successfully saved" + bankDataRepository.findAll().toString());
			return "success";
		} else {
			System.out.println("User Already Exist !");
		}

		return "Register Failed ";
	}

}
