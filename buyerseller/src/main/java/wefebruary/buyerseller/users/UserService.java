package wefebruary.buyerseller.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wefebruary.buyerseller.runner.RunnerApplication;
import wefebruary.buyerseller.runner.RunnerApplicationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RunnerApplicationRepository runnerApplicationRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public void switchRole(Long userId, String role) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(role);
        userRepository.save(user);
    }

    public String applyToBeRunner(Long userId) {
        Optional<RunnerApplication> existingApplication = runnerApplicationRepository.findByUserId(userId);
        if (existingApplication.isPresent()) {
            return "Application already submitted";
        }
        RunnerApplication application = new RunnerApplication();
        application.setUserId(userId);
        application.setApplicationStatus("PENDING");
        runnerApplicationRepository.save(application);
        return "Application submitted successfully";
    }

    public List<RunnerApplication> getRunnerApplications() {
        return runnerApplicationRepository.findByApplicationStatus("PENDING");
    }
}
