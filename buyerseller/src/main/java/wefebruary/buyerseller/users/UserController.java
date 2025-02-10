package wefebruary.buyerseller.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import wefebruary.buyerseller.runner.RunnerApplication;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser; // Return the user object
        } else {
            throw new RuntimeException("Login failed");
        }
    }

    @PostMapping("/switch-role")
    public void switchRole(@RequestParam Long userId, @RequestParam String role) {
        userService.switchRole(userId, role);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/apply-runner")
    public String applyToBeRunner(@RequestParam Long userId) {
        return userService.applyToBeRunner(userId);
    }

    @GetMapping("/runner-applications")
    public List<RunnerApplication> getRunnerApplications() {
        return userService.getRunnerApplications();
    }
}
