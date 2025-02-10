package wefebruary.buyerseller.runner;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RunnerApplicationRepository extends JpaRepository<RunnerApplication, Long> {
    List<RunnerApplication> findByApplicationStatus(String status);
    Optional<RunnerApplication> findByUserId(Long userId);
}
